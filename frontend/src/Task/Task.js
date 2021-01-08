import React, {useState} from 'react'
import "./Task.css"
import axios from "../axios"


function Task(props) {
    const [edit, showEdit] = useState(false)
    const [newEdit, setNewEdit] = useState("")

    function deleteTask(){
        axios.delete("/tasks", {data: {taskId: props.id}})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            }) 
    }

    function editTask(){
        showEdit(!edit)
    }

    return (
        <div className = "task-body">
            <h3>{props.task}</h3>

            <button onClick = {deleteTask}>Delete</button>
            <button onClick = {editTask}>Edit</button>

            {edit ? (
                <input type = "text" onChange = {(e) => setNewEdit(e.target.value)}></input>  
            )
            :(
                <p></p>
            )
            }

        </div>
    )

}

export default Task
