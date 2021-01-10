import React from 'react'
import "./Login.css"
import {auth, provider} from "../firebase"
import store from "../Redux/index"
import {connect} from "react-redux"
import firebase from "firebase" 


function Login() {

    const signIn = () => {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                auth
                .signInWithPopup(provider)
                .then((result) =>{
                    
                    updateUserInfo(result.user.displayName, result)
                    console.log(result)
                })
                .catch((error) => alert(error.message)) 
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
