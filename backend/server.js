// importing
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import Task from "./Models/dbTasks.js"
import User from "./Models/dbUser.js"
import connect from "connect"
//const express = require("express")
//const bodyParser = require("body-parser")
//const mongoose = require("mongoose")
//const cors = require("cors")
//import mongoURL from "/.env"



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
                    console.log("user created")
                }
                else{
                    res.status(201).send(data)
                    console.log("user not created")
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
            //console.log("got user")
            //console.log(data)
            res.send(data)
        }
    })
})


//update
app.put("/tasks", (req, res) => {
    Task.findById({_id: req.body.taskId})
        .then(task => {
            if(!task){
                return res.status(400).send({
                    message: "Task not found"
                })
            }

            task.updateOne({task: req.body.task}, (err, data) => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(200).send(data)
                }
            })
        })
})   


//delete
app.delete("/tasks", (req, res) => {

    let query = req.body.userId

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


    Task.deleteOne({_id: req.body.userId})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.body.userId
            });
        }
        res.send({message: "Task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.body.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user's task with id " + req.body.userId
        });
    });
})
    


// listener
app.listen(port, () => console.log(`listening ${port}`))

