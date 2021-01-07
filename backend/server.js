// importing
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import Task from "./dbTasks.js"


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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


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
    let task = req.body
    Task.create(task, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})


//read
app.get("/tasks", (res) => {
    Task.find((err, data) => {
        if(err){
            res.status(500).send(err)
            console.log("cant get tasks")
            console.log(err)
        }
        else{
            res.status(201).send(data)
            console.log(data)
            console.log("got tasks")
        }
    })
})


//update
//


//delete
//


// listener
app.listen(port, () => console.log(`listening ${port}`))

