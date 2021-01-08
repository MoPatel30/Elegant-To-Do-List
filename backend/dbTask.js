import mongoose from "mongoose"


const taskSchema = mongoose.Schema({
    task: String,

})


const task_content = mongoose.model("taskContent", taskSchema)
module.exports = task_content
