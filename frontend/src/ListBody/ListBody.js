import axios from 'axios'
import React, {useState, useEffect} from 'react'


function ListBody() {
    const [tasks, getTasks] = useState([])


    useEffect(() => {
        axios.get("/tasks")
            .then((response) => {
                getTasks(response.data)   
                console.log(response.data)                    
            })
            .catch((error) => {
                console.log(error)
            }) 
    }, [tasks])


    return (
        <div>

            <h1>Tasks</h1>

            <div>
                {tasks.map((task) => {
                    <p>{task}</p>
                })
                }
            </div>

        </div>
    )
}

export default ListBody
