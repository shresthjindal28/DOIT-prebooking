const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Choose the MongoDB URI based on the environment
    const dbURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI_LOCAL;
    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
