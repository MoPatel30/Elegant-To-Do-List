import axios from '../axios'
import React, {useState, useEffect} from 'react'
import Task from "../Task/Task"
import {connect} from "react-redux"


function ListBody({username, userInfo}) {
    const [tasks, getTasks] = useState([])
    const [numOfTasks, setNumOfTasks] = useState(0)
    const [firstName, setName] = useState(username.split(" ")[0])
    const [message, setMessage] = useState("")


    function changeMessage(){
        if(numOfTasks === 0){
            setMessage("Looks like an easy day today")
        }
        else if(numOfTasks > 0 && numOfTasks <= 5){
            setMessage("Not a lot of work today")
        }
        else{
            setMessage("Looks like a busy day. Get to work")
        }
    }
    
    useEffect(() => {
        axios.get("/tasks")
            .then((response) => {
                getTasks(response.data)  
                setNumOfTasks(response.data.length)                       
            })
            .catch((error) => {
                console.log(error)
            }) 

        changeMessage()

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
        changeMessage()
        //console.log("object")

    }, [tasks])


    return (
        <div className = "list-body">

        <h1 style = {{marginBottom: "10px", fontWeight: "300"}}>{message}, {firstName}.</h1>
            
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

const mapStateToProps = state => {
    return {
      username: state.username,
      userInfo: state.userInfo
    }
  }
  
  export default connect(mapStateToProps)(ListBody);