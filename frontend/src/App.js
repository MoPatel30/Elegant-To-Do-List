import React, {useEffect, useState} from "react"
import './App.css';
import CreateTask from './CreateTask/CreateTask';
import ListBody from "./ListBody/ListBody"
import {connect} from "react-redux"
import Login from "./Login/Login"
import {Avatar} from "@material-ui/core"
import Timer from "./Timer/Timer"
import axios from "./axios"
import Modal from "./Modal/Modal"
import store from "./Redux/index"



function App({username, userInfo, completions}) {
  const [userFound, setUserFound] = useState(false)
  const [tasks, setTasks] = useState([])
  const [count, setCount] = useState(0)


  useEffect(() => {
    if(userInfo && !userFound){
          
      let uid = {
        uid: userInfo.user.uid
      }

      console.log(uid)
      
      axios.get("/tasks", {uid: userInfo.user.uid})
        .then((response) => {
          console.log(response)
          setUserFound(true)
          setCount(response.data.completions)
          console.log("user found")
        })
        .catch((error) => {
          console.log(error)
          if(error){
            console.log("user not found")
            axios.post("/tasks", {uid: userInfo.user.uid, completions: 0, tasks: ["Welcome to the best Task Manager"]})
          }
        })
         
    }
   
  }, [])


  return (
    <div className="App">

      {username ? (
        <div>
          
          <Timer />

          <h1 className = "title">Very Simple Task Manager</h1>

          <div className="pro-pic">
            <div className="info">
              <p style = {{marginRight: "10px"}}>Welcome, {username}</p>
              <p style = {{marginRight: "10px", marginTop: "-20px"}}>Completed tasks: {count}</p>
            </div>    
            <Avatar id = "pic" src = {userInfo.user.photoURL} style = {{border: "2px solid black"}} />
          </div>    
   
          <div className="create">
            <CreateTask />
          </div>

          <div className = "list-pos">
            <ListBody />
          </div>
         
          <div>
            <Modal />
          </div>

        </div>
        
      )
      :(
        <div>  
            <Login />
        </div>
      )

      }

    </div>
  );
}


const mapStateToProps = state => {
  return {
    username: state.username,
    userInfo: state.userInfo,
    completions: state.completions
  }
}


export default connect(mapStateToProps)(App);