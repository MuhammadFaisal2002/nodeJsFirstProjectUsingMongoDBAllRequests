const express = require("express");
const userRouter = require('./routes/user')
const fs = require('fs')
const {connectMongoDb} = require('./connection')
const mongoose = require('mongoose')
const { log } = require("console");
const app = express();
const {logReqRes} = require("./middlewares")
const PORT = 8000;

connectMongoDb('mongodb://127.0.0.1:27017/first_project').then(()=>{console.log("mongoDb Connected")});
app.use('/api/users',userRouter)
//Middleware - plugin
app.use(express.urlencoded({extended:false}))
app.use(logReqRes('log.txt'))
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
})