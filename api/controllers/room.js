import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req,res,next) =>{
    const RoomId = req.params.RoomId
    const newRoom = new Room(req.body);
    try {
        const savedRoom= await newRoom.save()
        try {
            await Room.finedByAndUpdate(RoomId, {
                $push: {rooms: savedRoom._id },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(err)
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
    try {
        await Rooms.findByIdAndDelete(req.params.id, {$set: req.body})
        res.status(200).json("Room Deleted")
    } catch (err) {
        next(err)
    } 
}

export const getRoom= async (req, res, next)=>{
    try {
        const Room= await Rooms.findById(req.params.id)
        res.status(200).json(Room)
    } catch (err) {
        next(err)
    } 
}

export const getRooms= async (req, res, next)=>{
    try {
        const Room= await Rooms.find()
        res.status(200).json(Room)
    } catch (err) {
        next(err)
    } 
}