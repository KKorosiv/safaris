const Tour = require("../models/Tours");

//new tour
const createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single tour 
const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update tour
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a tour
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get upcoming tours
const getUpcomingTours = async (req, res) => {
  try {
    const upcomingTours = await Tour.find({ date: { $gte: new Date() } }).sort({ date: 1 });
    res.json(upcomingTours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get popular tours
const getPopularTours = async (req, res) => {
  try {
    const popularTours = await Tour.find().sort({ popularity: -1 }).limit(10);
    res.json(popularTours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get most booked tours
const getMostBookedTours = async (req, res) => {
  try {
    const mostBookedTours = await Tour.find().sort({ bookings: -1 }).limit(10);
    res.json(mostBookedTours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
  getUpcomingTours,
  getPopularTours,
  getMostBookedTours,
};
