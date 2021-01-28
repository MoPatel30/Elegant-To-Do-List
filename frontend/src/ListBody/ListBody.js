import axios from '../axios'
import React, {useState, useEffect} from 'react'
import Task from "../Task/Task"
import {connect} from "react-redux"
import "./ListBody.css"
import store from "../Redux/index"



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

        console.log("object")
        console.log(store.getState().userInfo.user.uid)

        let uid = {
            uid: userInfo.user.uid
        }

        axios.get("/tasks", uid)
      
            .then((response) => {
                getTasks(response.data.task)  
                setNumOfTasks(response.data.task.length)                       
            })
            .catch((error) => {
                console.log(error)
            }) 

        changeMessage()

    }, [])


    useEffect(() => { 
      
        let uid = {
            uid: userInfo.user.uid
        }
        
        axios.get("/tasks", uid)
            .then((response) => {      
                getTasks(response.data.task)  
                setNumOfTasks(response.data.task.length)                              
            })
            .catch((error) => {
                console.log(error)
            }) 

        changeMessage()
        //console.log(tasks) 

    }, [tasks])


    return (
        <div className = "list-body">

        <h1 id = "message">{message}, {firstName}.</h1>
            
            <p style = {{marginBottom: "30px", fontWeight: "900"}}>Remaining Tasks: {numOfTasks}</p>
            
            <div className = "list">
                {tasks.map((task) => (
                    <Task task = {task} id = {task._id} />
                    
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