import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'

const app= express()
dotenv.config()
mongoose.set('strictQuery', false);
const connect = async()=>{
try {
    await mongoose.connect(process.env.MONGO)
    
    console.log("Database Connected.............");
  } catch (error) {
    throw error
  }
}
mongoose.connection.on("disconnected", ()=>{
    console.log("Database Disconnected!!!!!!");
})
mongoose.connection.on("connected", ()=>{
    console.log("Connected to database..................");
})

//middlewares




app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.use((err, req, res, next)=>{
  const errStatus = err.status || 500
  const errMsg = err.message || "Something went wrong"

  return res.status(errStatus).json({
    scccess: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack
  })
})


app.listen(2021 ,()=>{
    connect()
    console.log("Server Started...........");
})