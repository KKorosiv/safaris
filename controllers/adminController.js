const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error in registerAdmin:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

const loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    
    console.log("Login attempt for email:", email);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found!");
      return res.status(401).json({ error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password!");
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful, Token generated!");
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in loginAdmin:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

module.exports = { registerAdmin, loginAdmin };
