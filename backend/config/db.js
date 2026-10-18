const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check both MONGO_URI and MONGODB_URI to prevent undefined error
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;