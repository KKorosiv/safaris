const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const createAdmin = async () => {
  try {
    const email = "samuelhenia2@gmail.com"; 
    const password = "korosivking"; 

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin);
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully:", admin);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
