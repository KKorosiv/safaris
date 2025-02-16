const mongoose = require('mongoose');
const Tour = require('./tourModel'); 
const tours = require('./tours.json'); 

mongoose.connect('mongodb://localhost:27017/tours', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  try {
    await Tour.insertMany(tours);
    console.log('Tours added successfully');
  } catch (error) {
    console.error('Error adding tours:', error);
  } finally {
    mongoose.disconnect();
  }
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});
