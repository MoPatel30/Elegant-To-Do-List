import React, {useEffect, useState} from "react"
import './App.css';
import CreateTask from './CreateTask/CreateTask';
import ListBody from "./ListBody/ListBody"
import {connect} from "react-redux"
import Login from "./Login/Login"
import {Avatar} from "@material-ui/core"
import Timer from "./Timer/Timer"
import axios from "./axios"


function App({username, userInfo}) {

  useEffect(() => {
    if(userInfo){
      axios.get("/tasks", {uid: userInfo.user.uid})
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log("user not found")
          axios.post("/tasks", {uid: userInfo.user.uid, completions: 1, tasks: ["hi", "mo", "g"]})
        })
    }
  }, [username])


  return (
    <div className="App">

      {username ? (
        <div>

          <Timer />

          <h1>Very Simple Task Manager</h1>

          <div className="pro-pic">
            <div className="info">
              <p style = {{marginRight: "10px"}}>Welcome, {username}</p>
              <p style = {{marginRight: "10px", marginTop: "-20px"}}>Completed tasks: 0</p>
            </div>    
            <Avatar id = "pic" src = {userInfo.user.photoURL} />
          </div>    
          
          <CreateTask />

          <div className = "list-pos">
            <ListBody />
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
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(App);