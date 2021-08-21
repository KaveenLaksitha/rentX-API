"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var cors = require("cors");

var bodyParser = require("body-parser");

require("dotenv").config();

var empRoutes = require("./controller/employeeController");

var port = 4000;
var URL = process.env.MONGODB_URL;
app.use(cors());
app.use(bodyParser.json());
app.use("/api", empRoutes);
mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindandModify: false
});
var connection = mongoose.connection;
connection.once("open", function () {
  console.log("Mongodb Connection success!");
}); //Vehicle_Routes

var vehicleRouter = require("./controller/vehicleController.js");

app.use("/vehicle", vehicleRouter);
app.listen(port, function () {
  console.log("Server Is Running on Port: ".concat(port));
}); //hasani

var rentalRouter = require("./controller/rentalController.js");

app.use("/rental", rentalRouter); //table name is created at this point

var deletedRentalsRouter = require("./controller/removedRentalController.js");

app.use("/deletedRentals", deletedRentalsRouter);

var reservationController = require("./controller/reservationController.js");

app.use("/reservations", reservationController);

var deletedReservationRouter = require("./controller/removedReservationController.js");

app.use("/deletedReservations", deletedReservationRouter);
//# sourceMappingURL=server.dev.js.map