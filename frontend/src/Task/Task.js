import React, {useState} from 'react'
import "./Task.css"
import axios from "../axios"
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';


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

    function showEditOption(){
        if(showEdit){
            setNewEdit("")
        }
        showEdit(!edit)
    }

    function editTask(){
        axios.put("/tasks", {taskId: props.id, task: newEdit})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            }) 
    }

    return (
        <div className = "task-body">
            
            <h3 id = "text-style">{props.task}</h3>
                   
            <div>
                <DeleteIcon onClick = {deleteTask} style = {{cursor: "pointer"}} />
            </div>

            <div>
                <EditIcon onClick = {showEditOption} style = {{cursor: "pointer"}} />  
            </div>

            {edit ? (
                <div>
                    <input type = "text" onChange = {(e) => setNewEdit(e.target.value)}></input> 
                    <PublishIcon onClick = {editTask} style = {{cursor: "pointer"}} />
                </div>
                 
            )
            :(
                <p></p>
            )
            }

        </div>
    )

}

export default Task
