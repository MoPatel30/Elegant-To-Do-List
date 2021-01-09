import {createStore} from "redux"




const initialState = {
    username: "",
    userInfo: null,
    isLoggedIn: false 
}



const reducer = (state = initialState, action) => {
    if(action.type === "User_Logged_In"){
        return Object.assign({}, state, {
            username: action.payload.username,
            userInfo: action.payload.userInfo,
            isLoggedIn: true
        })
    }

    return state
}




const store = createStore(reducer)

export default store