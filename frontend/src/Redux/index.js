import {createStore} from "redux"


const initialState = {
    username: "",
    userInfo: null,
    isLoggedIn: false,
    currentTasks: []
}


const reducer = (state = initialState, action) => {
    if(action.type === "User_Logged_In"){
        return Object.assign({}, state, {
            username: action.payload.username,
            userInfo: action.payload.userInfo,
            isLoggedIn: true,
            currentTask: action.payload.currentTasks
        })
    }

    return state
}


const store = createStore(reducer)

export default store