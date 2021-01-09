import './App.css';
import CreateTask from './CreateTask/CreateTask';
import ListBody from "./ListBody/ListBody"
import {connect} from "react-redux"
import Login from "./Login/Login"
import {Avatar} from "@material-ui/core"


function App({username, userInfo}) {
  return (
    <div className="App">

      {username ? (
        <div>
          
          <h1>Very Simple To-Do List</h1>

          <div className="pro-pic">
            <p style = {{marginRight: "10px"}}>Welcome, {username}</p>
            <Avatar id = "pro-pic" src = {userInfo.user.photoURL} />
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