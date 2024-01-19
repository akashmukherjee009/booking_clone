import Hotels from "../models/Hotels.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";



export const createRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body);
    try {
        const savedRoom= await newRoom.save()
        try {
            const updateInfo= await Hotels.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id }
            })
            console.log(updateInfo);
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom= async (req, res, next)=>{
    
    try {
        const updateRoom= await Room.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updateRoom)
    } catch (err) {
        next(err)
    } 
}

export const deleteRoom= async (req, res, next)=>{
    const hotelId= req.params.hotelid
    try {
        await Room.findByIdAndDelete(req.params.id, {$set: req.body})
        try {
            await Hotels.findByIdAndUpdate(hotelId,{
                $pull: {rooms: req.params.id}
            })
        } catch (err) {
            next(err)
        } 

        res.status(200).json("Room Deleted")
    } catch (err) {
        next(err)
    } 
}

export const getRoom= async (req, res, next)=>{
    try {
        const getRoom= await Room.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (err) {
        next(err)
    } 
}

export const getRooms= async (req, res, next)=>{
    try {
        const getRoom= await Room.find()
        res.status(200).json(getRoom)
    } catch (err) {
        next(err)
    } 
}