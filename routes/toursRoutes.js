const express = require("express");
const router = express.Router();
const {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
  getUpcomingTours,
  getPopularTours,
  getMostBookedTours,
} = require("../controllers/toursController");

router.post("/", createTour);
router.get("/upcoming", getUpcomingTours);
router.get("/popular", getPopularTours);
router.get("/most-booked", getMostBookedTours);
router.get("/", getAllTours);
router.get("/:id", getTourById);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
