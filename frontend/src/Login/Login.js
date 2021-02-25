import React, {useState} from 'react'
import "./Login.css"
import {auth, provider} from "../firebase"
import store from "../Redux/index"
import {connect} from "react-redux"
import firebase from "firebase" 
import axios from "../axios"
import SelectInput from '@material-ui/core/Select/SelectInput'


function Login() {
    const [isUserFound, setIsUserFound] = useState(false)
    const [userInfo, setUserInfo] = useState()

    const signIn = () => {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                auth
                .signInWithPopup(provider)
                .then((result) =>{    
                    //setUserInfo(result)
                    axios.get("/tasks", {uid: result.user.uid})
                    .then((response) => {
                       
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].uid === result.user.uid){
                                console.log("user found")
                                setIsUserFound(true)
                                updateUserInfo(result.user.displayName, result)
                            }
                            
                        }

                       

                        if(!isUserFound){
                            addNewUserData(result)
                        }
                      
                    })
                    .catch((error) => {
                      console.log(error)
                    //   if(error){
                         console.log("user not found")
                    //     axios.post("/tasks", {uid: userInfo.user.uid, completions: 0, tasks: ["Welcome to the best Task Manager"]})
                    //   }
                    })
                })
                .catch((error) => alert(error.message)) 
            })
    }


    function addNewUserData(userInfo){
        axios.post("/tasks", {uid: userInfo.user.uid, completions: 0, tasks: ["Welcome to the best Task Manager"]})
            .then((response)=> {
                console.log(response)
                setIsUserFound(true)
                updateUserInfo(userInfo.user.displayName, userInfo)
            })
            .catch((error) => {
                console.log(error)
            })
         
    }

    function updateUserInfo(username, userInfo){
        store.dispatch({
            type: "User_Logged_In",
            payload: {
                username: username,
                userInfo: userInfo,
                isLoggedIn: true
            }    
        })
       
    }

    return (
        <div className = "login-screen">
            <h1 id = "welcome"><i>Welcome to RemainingTasks</i></h1>
            <p id = "slogan"><i>Managing tasks has never been simpler!</i></p>
            <button id = "google-btn" onClick = {signIn}>Google</button>            
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
export default connect(mapDispatchToProps)(Login)
