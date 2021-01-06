import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"

//const express = require("express")
//const bodyParser = require("body-parser")
//const mongoose = require("mongoose")
//const cors = require("cors")
//import mongoURL from "/.env"


const port = process.env.port || 9000

const app = express()


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


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





app.listen(port, () => console.log(`listening ${port}`))

