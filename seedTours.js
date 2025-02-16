const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./models/Tours");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // New tours data
    const tours = [
      {
        title: "Savannah Adventure",
        description: "Experience the thrill of an unforgettable adventure in the vast African Savannah.",
        price: 500,
        location: "Nairobi",
        image: "/jp-travels/savannah.jpg",
        date: new Date("2025-04-15"),
        popularity: 5,
        bookings: 10,
      },
      {
        title: "Jungle Exploration",
        description: "Venture deep into the jungle and experience its stunning wildlife.",
        price: 700,
        location: "Nairobi",
        image: "/jp-travels/jungle.jpg",
        date: new Date("2025-05-20"),
        popularity: 8,
        bookings: 15,
      },
      {
        title: "Desert Safari",
        description: "Explore the vast desert with a luxury safari experience.",
        price: 800,
        location: "Nairobi",
        image: "/jp-travels/desert.jpg",
        date: new Date("2025-06-10"),
        popularity: 7,
        bookings: 20,
      },
      {
        title: "Mountain Trek",
        description: "Climb the majestic mountains and enjoy breathtaking views.",
        price: 600,
        location: "Nairobi",
        image: "/jp-travels/mountain.jpg",
        date: new Date("2025-07-05"),
        popularity: 6,
        bookings: 12,
      },
      {
        title: "Lakeside Retreat",
        description: "Relax by the serene lakeside and enjoy peaceful surroundings.",
        price: 550,
        location: "Nairobi",
        image: "/jp-travels/lakeside.jpg",
        date: new Date("2025-08-18"),
        popularity: 9,
        bookings: 18,
      },
    ];

    // Insert new tours
    await Tour.insertMany(tours);
    console.log("Seeded new tours successfully");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  });
