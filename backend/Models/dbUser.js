import mongoose from "mongoose"
import Tasks from "./dbTasks.js"

const userSchema = mongoose.Schema({
    username: String,
    completions: Number,
    tasks: Object
})


const users = mongoose.model("users", userSchema)
export default users