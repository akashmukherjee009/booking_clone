import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, getHotelsByCity, getHotelsByType, updateHotel } from "../controllers/hotel.js";
import Hotels from "../models/Hotels.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router= express.Router();


//Create
router.post("/", verifyAdmin, createHotel)
//Update
router.put("/:id", verifyAdmin, updateHotel)
//Delete
router.delete("/find/:id", verifyAdmin, deleteHotel)
//Get
router.get("/find/:id", getHotel)
//Get All
router.get("/", getHotels)

router.get("/countByCityName", getHotelsByCity)
router.get("/countByType", getHotelsByType)


export default router