import axios from '../axios'
import React, {useState, useEffect} from 'react'
import Task from "../Task/Task"


function ListBody() {
    const [tasks, getTasks] = useState([])
    const [numOfTasks, setNumOfTasks] = useState(0)

    useEffect(() => {
        axios.get("/tasks")
            .then((response) => {
                getTasks(response.data)  
                setNumOfTasks(response.data.length)                       
            })
            .catch((error) => {
                console.log(error)
            }) 

    }, [])


    useEffect(() => { 
      
        axios.get("/tasks")
            .then((response) => { 
                getTasks(response.data)  
                setNumOfTasks(response.data.length)                              
            })
            .catch((error) => {
                console.log(error)
            }) 
        
        //console.log("object")

    }, [tasks])


    return (
        <div className = "list-body">

            <h1 style = {{marginBottom: "10px", fontWeight: "300"}}>Tasks</h1>
            
            <p style = {{marginBottom: "30px", fontWeight: "900"}}>Remaining Tasks: {numOfTasks}</p>
            
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
