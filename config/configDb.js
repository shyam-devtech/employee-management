const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require('dotenv').config();

//Connect to database
const connDb = () => {
  try {
    mongoose.connect(process.env.DB_LOCAL_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to db");
  } catch (error) {
    handleError(error);
  }
};

module.exports = connDb;
