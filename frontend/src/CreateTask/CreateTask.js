import React, {useState} from 'react'


function CreateTask() {

    const [task, setTask] = useState("")
   
    function submitTask(){
        alert(task)
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
