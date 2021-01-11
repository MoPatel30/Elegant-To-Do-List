import React, {useState} from 'react'
import "./Task.css"
import axios from "../axios"
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


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
            
            <p id = "text-style">{props.task}</p>

            <div id = "right-info">
      
                {edit ? (
                    <div style = {{display: "flex"}}>
                        <input type = "text" id = "edit-box" onChange = {(e) => setNewEdit(e.target.value)}></input> 
                        <PublishIcon onClick = {editTask} style = {{cursor: "pointer", marginRight: "20px"}} />
                    </div>
                    
                )
                :(
                    <p></p>
                )
                }

                
                <div id = "edit">
                    <EditIcon onClick = {showEditOption} style = {{cursor: "pointer"}} />  
                </div>

                <div id = "delete">
                    <DeleteIcon onClick = {deleteTask} style = {{cursor: "pointer"}} />
                </div>

                <div id = "done">
                    <DoneOutlineIcon onClick = {deleteTask} style = {{cursor: "pointer", fontSize: 'large', color: "green"}} />
                </div>

            </div>

        </div>
    )

}

export default Task




