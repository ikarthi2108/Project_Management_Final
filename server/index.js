//imports
require('dotenv').config()
const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const SignInRoutes=require('./Routes/SignInRoutes');
const EmployeeRoutes=require('./Routes/EmployeeRoutes')
const ForgetPasswordRoutes=require('./Routes/ForgetPasswordRoutes')
const getDataRoutes=require('./Routes/GetDataRoutes')
const AssignedTaskRoutes=require('./Routes/AssignedTaskRoutes')

//Express obj

const app=express()


//Database Connection

mongoose.connect("mongodb://127.0.0.1:27017/Project_Management")

//middlewares

app.use(express.json())
app.use(cors())

app.use('/',SignInRoutes)
app.use('/',EmployeeRoutes)
app.use("/",ForgetPasswordRoutes)
app.use("/",getDataRoutes)
app.use("/",AssignedTaskRoutes)


//Routes




//Global Env

const port=process.env.PORT

//Running the sever on the port 

app.listen(port,()=>{
    console.log(`Server is runninng on the port ${port}`)
})


