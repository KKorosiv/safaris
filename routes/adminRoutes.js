const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");


const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/dashboard", adminAuthMiddleware, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

module.exports = router;
