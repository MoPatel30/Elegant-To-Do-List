import React, {useState} from 'react'
import axios from "../axios"
import PostAddIcon from '@material-ui/icons/PostAdd';


function CreateTask() {

    const [task, setTask] = useState("")
   
    function submitTask(){
        
        axios.post("/tasks", {task: task})
            .then((response) => {
                if(response){
                    console.log(response)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        setTask("")
        document.getElementById("input").value = ""
    }

    return (
        <div style = {{marginBottom: "25px"}}>
           <input id = "input" type = "text" onChange = {(e) => {setTask(e.target.value)}}></input>
           <PostAddIcon onClick = {submitTask} style = {{cursor: "pointer", marginLeft: "5px"}} />
        </div>
    )
}

export default CreateTask
