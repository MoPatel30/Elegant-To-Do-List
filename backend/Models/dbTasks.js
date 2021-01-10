import mongoose from "mongoose"


const taskSchema = mongoose.Schema({
    uid: String,
    completions: Number,
    task: Array
})


const task_content = mongoose.model("taskContent", taskSchema)
export default task_content