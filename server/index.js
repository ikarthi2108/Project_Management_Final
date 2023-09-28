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
const AddProjectRoutes=require('./Routes/AddProjectRoutes')
const AddTaskRoutes=require('./Routes/AddTaskRoutes')
const SendReportRoutes=require('./Routes/SendReportRoute')
//Express obj

const app=express()


//Database Connection

mongoose.connect("mongodb://127.0.0.1:27017/Project_Management")

//middlewares

//CORS - Cross- Origin Resource Sharing - to block the unauthorized server access 
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(express.json())
// to parse the encoded data from url to make it available for the req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

app.use('/',SignInRoutes)
app.use('/',EmployeeRoutes)
app.use("/",ForgetPasswordRoutes)
app.use("/",getDataRoutes)
app.use("/",AssignedTaskRoutes)
app.use("/",AddProjectRoutes)
app.use("/",AddTaskRoutes)
app.use("/",SendReportRoutes)

//Routes




//Global Env

const port=process.env.PORT

//Running the sever on the port 

app.listen(port,()=>{
    console.log(`Server is runninng on the port ${port}`)
})


