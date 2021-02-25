import axios from "axios"

const instance = axios.create({
    baseURL: "https://task-manager-backend-node.herokuapp.com"
})
// http://localhost:9000
//https://task-manager-backend-node.herokuapp.com
export default instance
