// importing
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import Task from "./Models/dbTasks.js"
import User from "./Models/dbUser.js"
import connect from "connect"




const port = process.env.port || 9000

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// DB connection
const connection_url =
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection


db.once("open", () => {
    console.log("DB conected")
})


// RestAPI - Building endpoints 
app.get("/", (res) => {res.status(200).send("Hello world")})


//create
app.post("/tasks", (req, res) => {
    console.log(req.body)
    const length = Object.keys(req.body).length

    Task.findOne({uid: req.body.uid}, (err, data) => {
        if(length === 3){
            let user = req.body
            Task.create(user, (err, data) => {
                if(err){
                    res.status(500).send(err)
                    console.log("user not created")
                }
                else{
                    res.status(201).send(data)
                    console.log("user created")
                }
            })
            console.log(err)
        } 
        else{
            let newTask = req.body.task
            let currentList = [newTask]
            let query = {uid: req.body.uid}

            Task.findOne(query, (err, data) => {
                if(err){
                    res.send(err)
                    console.log("cant get user")
                    console.log(err)
                }
                else{
                  
                    console.log("info", data.task)
                   
                    data.task.map(job => {
                        currentList.push(job)
                    })

                    Task.findOneAndUpdate({uid: req.body.uid}, {task: currentList}, {useFindAndModify : false}, (err, data) => {
               
                        console.log(currentList)
                        if(err){
                            res.send(err)
                            console.log("cant update tasks")
                            console.log(err)
                        }
                        else{
                            console.log("update", data)
                            res.send(data)
                        } 
                    })
    
                }
            })
            
        }
    })
})


//create new user
app.post("/newUser", (req, res) => {
    let user = req.body
    Task.create(user, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})


//read
app.get("/tasks", (req, res) => {
   
    let query = req.body

    Task.findOne(query, (err, data) => {
        if(err){
            res.send(err)
            console.log("cant get user")
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
})


//updating user's task list
app.put("/edittasks", (req, res) => {
    let query = {
        uid: req.body.uid
    }

    Task.findOne(query, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            console.log(data.task)
            let allTasks = data.task

            let idx = allTasks.indexOf(req.body.oldTask)
            allTasks[idx] = req.body.task

            console.log(allTasks)

            Task.findOneAndUpdate(query, {task: allTasks}, {useFindAndModify : false}, (err, data) => {
                if(err){
                    res.send(err)
                    console.log(err)
                }
                else{
                    console.log(data)
                } 
            })
        }
    })
})   


//deleting task by updating user info
app.put("/tasks", (req, res) => {
    let query = {
        uid: req.body.uid
    }
    let currentList = []
    let taskToRemove = req.body.task
    let count = 0

    Task.findOne(query, (err, data) => {
        if(err){
            res.send(err)
            console.log(err)
        }
        else{          
            data.task.map(job => {
                currentList.push(job)
            })

            count = data.completions

            const index = currentList.indexOf(taskToRemove);
            console.log(index)
            console.log(taskToRemove)
            if (index > -1) {
            currentList.splice(index, 1);
            }   
                       
            const length = Object.keys(req.body).length

            if(length === 3){
                count += 1
                console.log(count)
                Task.findOneAndUpdate(query, {completions: count}, {useFindAndModify : false}, (err, data) => {
                    if(err){
                        res.send(err)
                        console.log(err)
                    }
                    else{
                        console.log(data)
                    } 
                })
            }

            Task.findOneAndUpdate({uid: req.body.uid}, {task: currentList}, {useFindAndModify : false}, (err, data) => {
                console.log(currentList)
                if(err){
                    res.send(err)    
                    console.log(err)
                }
                else{
                    res.send(data)
                } 
            })

        }
    
    })
     
})
    


// listener
app.listen(port, () => console.log(`listening ${port}`))

