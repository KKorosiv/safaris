const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware"); 
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, userId: req.user.userId });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
