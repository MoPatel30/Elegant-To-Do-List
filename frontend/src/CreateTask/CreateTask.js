import React, {useState} from 'react'
import axios from "../axios"
import PostAddIcon from '@material-ui/icons/PostAdd';
import {connect} from "react-redux"
import store from "../Redux/index"


function CreateTask({userInfo}) {

    const [task, setTask] = useState("")
   
    function submitTask(){
       
        axios.post("/tasks", {uid: userInfo.user.uid, task: task, currentList: [], newUser: false})
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

const mapStateToProps = state => {
    return {
      userInfo: state.userInfo,
    }
  }


  export default connect(mapStateToProps)(CreateTask);

