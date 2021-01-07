import mongoose from "mongoose"


const taskSchema = mongoose.Schema({
    task: String
})


const task_content = mongoose.model("taskContent", taskSchema)
export default task_content