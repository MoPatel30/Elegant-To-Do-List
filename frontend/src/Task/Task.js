import React, {useState} from 'react'
import "./Task.css"
import axios from "../axios"
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Modal from "react-modal";
import {connect} from "react-redux";
import store from "../Redux/index";



function Task(props) {
    const [edit, showEdit] = useState(false)


    function deleteTask(){
        const userInfo = store.getState().userInfo
        
        axios.put("/tasks", {uid: userInfo.user.uid, task: props.task})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            }) 
    }

    function completeTask(){
        const userInfo = store.getState().userInfo
        
        axios.put("/tasks", {uid: userInfo.user.uid, task: props.task, isComplete: true})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            }) 
        
    }

    function showEditOption(){
        showEdit(!edit)
    }


    return (
        <div className = "task-body">
            
            <p id = "text-style">{props.task}</p>

            <div id = "right-info">
      
                {edit ? (
                    <div style = {{display: "flex"}}>
                        <EditModal id = {props.id} oldTask = {props.task} uid = {store.getState().userInfo.user.uid} />
                    </div>
                    
                )
                :(
                    <p></p>
                )
                }

                
                <div id = "edit">
                    <EditIcon onClick = {showEditOption} style = {{cursor: "pointer"}} />  
                </div>

                <div id = "delete">
                    <DeleteIcon onClick = {deleteTask} style = {{cursor: "pointer"}} />
                </div>

                <div id = "done">
                    <DoneOutlineIcon onClick = {completeTask} style = {{cursor: "pointer", fontSize: 'large', color: "green"}} />
                </div>

            </div>

        </div>
    )

}

const mapStateToProps = state => {
    return {
      userInfo: state.userInfo
    }
  }
  
export default connect(mapStateToProps)(Task);




export function EditModal(props){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(true);
    const [newEdit, setNewEdit] = useState("")


    function afterOpenModal() {
      subtitle.style.color = '#f00';
    }
  
    function closeModal(){
      setIsOpen(false);
    }
  
    function editTask(){
        axios.put("/edittasks", {taskId: props.id, task: newEdit, oldTask: props.oldTask, uid: props.uid})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            }) 
    }

    return (
        <div>  
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}      
                contentLabel="Example Modal"
                className = "modal-styling"
            >
  
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Modify Task</h2>
                <p style = {{fontWeight: "900", maxWidth: "70%"}}> Current Task: {props.oldTask}</p>


                <div className = "submit-scn">
                    <input type = "text" id = "edit-box" onChange = {(e) => setNewEdit(e.target.value)}></input> 
                    <img style = {{cursor: "pointer"}} onClick = {closeModal} src="https://img.icons8.com/ios-glyphs/25/000000/macos-close.png"/>
                    <PublishIcon onClick = {editTask} style = {{cursor: "pointer"}} />        
                </div>  

            </Modal>
        </div>
    );
}

