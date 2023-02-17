import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import Hotels from "../models/Hotels.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router= express.Router();


//Create
router.post("/", verifyAdmin, createHotel)
//Update
router.put("/:id", verifyAdmin, updateHotel)
//Delete
router.delete("/:id", verifyAdmin, deleteHotel)
//Get
router.get("/:id", getHotel)
//Get All
router.get("/", getHotels)


export default router