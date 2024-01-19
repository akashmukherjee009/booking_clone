import Hotels from "../models/Hotels.js"

export const createHotel= async (req, res, next)=>{
    const newHotel= new Hotels(req.body)

    try {
        const savedHotel= await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    } 
}

export const updateHotel= async (req, res, next)=>{
    
    try {
        const updateHotel= await Hotels.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err)
    } 
}

export const deleteHotel= async (req, res, next)=>{
    try {
        await Hotels.findByIdAndDelete(req.params.id, {$set: req.body})
        res.status(200).json("Hotel Deleted")
    } catch (err) {
        next(err)
    } 
}

export const getHotel= async (req, res, next)=>{
    try {
        const hotel= await Hotels.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    } 
}

export const getHotels= async (req, res, next)=>{
    const {min, max, ...others} = req.query
    try {
        const hotel= await Hotels.find({...others, cheapestprice: {$gt:min | 1, $lt: max || 999999999}}).limit(req.query.limit);
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    } 
}


export const getHotelsByCity= async (req, res, next)=>{
    const cities= req.query.cities.split(',')
    try {
        const list= await Promise.all(cities.map(city=>{
            return Hotels.countDocuments({city: city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    } 
}
export const getHotelsByType= async (req, res, next)=>{
   
    try {
        const hotel= await Hotels.countDocuments({type: "hotel"})
        const apartment= await Hotels.countDocuments({type: "apartment"})
        const resort= await Hotels.countDocuments({type: "resort"})
        const villa= await Hotels.countDocuments({type: "villa"})
        const cabin= await Hotels.countDocuments({type: "cabin"})
        res.status(200).json([
            {type: "hotel", count: hotel},
            {type: "apartment", count: apartment},
            {type: "resort", count: resort},
            {type: "villa", count: villa},
            {type: "cabin", count: cabin}

        ])
    } catch (err) {
        next(err)
    } 
}