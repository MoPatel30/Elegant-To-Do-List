import React, {useState} from 'react'
import axios from "../axios"


function CreateTask() {

    const [task, setTask] = useState("")
   
    function submitTask(){
        
        axios.post("/tasks", {
            task: task
        })

        setTask("")
        document.getElementById("input").value = ""
    }

    return (
        <div>
           <input id = "input" type = "text" onChange = {(e) => {setTask(e.target.value)}}></input>
           <button onClick = {submitTask}>Add Task</button>
        </div>
    )
}

export default CreateTask
