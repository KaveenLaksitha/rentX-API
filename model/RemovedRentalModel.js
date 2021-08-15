const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const removedRentalSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    returnDate: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['completed'],
        maxlength: 10,
        minlength: 7
    },

    payment: {
        type: String,
        required: true,
        enum: ['cash', 'card'],
        maxlength: 4,
        minlength: 4
    },

    vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'van', 'bus'],
        maxlength: 3,
        minlength: 3
    },

    model: {
        type: String,
        required: true,
    },

    advPayment: {
        type: Number,
        required: true,
    },

    finalPrice: {
        type: Number,
        required: true,
    },

    customerName: {
        type: String,
        required: true,
        maxlength: 200

    },

    customerNIC: {
        type: String,
        required: true,

    },
    contactNo: {
        type: Number,
        required: true,
    },

    penaltyDays: {
        type: Number,
        required: true,
    },

    penaltyCharges: {
        type: Number,
        required: true,

    },




})

const RemovedRental = mongoose.model("RemovedRental", removedRentalSchema);

module.exports = RemovedRental;