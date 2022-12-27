const express = require("express");
const app = express();
const cors = require("cors");
const dbConn = require("./config/configDb");
require("dotenv").config();
const userRoutes = require("./routes/employee.routes");

app.use(express.json());
app.use(cors());
app.use("/", userRoutes);
dbConn();

app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000, () => console.log(`Server listening on ${process.env.PORT}`)); 