const mongoose = require("mongoose");

const mongoURL =
  "mongodb://127.0.0.1:27017/Reservation_Hotel";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB connection failed");
});

connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

module.exports = connection;
