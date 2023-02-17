import Users from "../models/User.js"


export const updateUser= async (req, res, next)=>{
    
    try {
        const updateUser= await Users.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updateUser)
    } catch (err) {
        next(err)
    } 
}

export const deleteUser= async (req, res, next)=>{
    try {
        await Users.findByIdAndDelete(req.params.id, {$set: req.body})
        res.status(200).json("User Deleted")
    } catch (err) {
        next(err)
    } 
}

export const getUser= async (req, res, next)=>{
    try {
        const User= await Users.findById(req.params.id)
        res.status(200).json(User)
    } catch (err) {
        next(err)
    } 
}

export const getUsers= async (req, res, next)=>{
    try {
        const User= await Users.find()
        res.status(200).json(User)
    } catch (err) {
        next(err)
    } 
}