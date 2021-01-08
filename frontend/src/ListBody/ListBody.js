import axios from '../axios'
import React, {useState, useEffect} from 'react'
import Task from "../Task/Task"


function ListBody() {
    const [tasks, getTasks] = useState([])


    useEffect(() => {
        axios.get("/tasks")
            .then((response) => {
                getTasks(response.data)                         
            })
            .catch((error) => {
                console.log(error)
            }) 

    }, [])


    useEffect(() => { 
      
        axios.get("/tasks")
            .then((response) => { 
                getTasks(response.data)                            
            })
            .catch((error) => {
                console.log(error)
            }) 
        
        //console.log("object")

    }, [tasks])


    return (
        <div className = "list-body">

            <h1>Tasks</h1>

            <div className = "list">
                {tasks.map((task) => (
                    <Task task = {task.task} id = {task._id} />
                    
                ))
                }
            </div>

        </div>
    )
}

export default ListBody
