const readline = require("readline");
const mongoose = require("mongoose");
require("dotenv").config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("❗ Are you sure you want to delete all tours? (yes/no): ", async (answer) => {
  if (answer.toLowerCase() === "yes") {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(async () => {
        const Tour = require("./models/Tours");
        await Tour.deleteMany({});
        console.log("✅ Deleted all tours from the database!");
        mongoose.connection.close();
        rl.close();
      })
      .catch(console.error);
  } else {
    console.log("Deletion canceled.");
    rl.close();
  }
});
