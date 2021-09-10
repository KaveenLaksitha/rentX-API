const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const empRoutes = require("./controller/employeeController");

const port = 4000;

const URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());

app.use("/api", empRoutes);

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindandModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

//Vehicle_Routes
const vehicleRouter = require("./controller/vehicleController.js");
app.use("/vehicle", vehicleRouter);

const vehicleRemoveRouter = require("./controller/removeVehicleController.js");
app.use("/vehicleRemove", vehicleRemoveRouter);


app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});

//hasani
const rentalRouter = require("./controller/rentalController.js");
app.use("/rental", rentalRouter);//table name is created at this point

const deletedRentalsRouter = require("./controller/removedRentalController.js");
app.use("/deletedRentals", deletedRentalsRouter);


const reservationController = require("./controller/reservationController.js");
app.use("/reservations", reservationController);

const deletedReservationRouter = require("./controller/removedReservationController.js");
app.use("/deletedReservations", deletedReservationRouter);
