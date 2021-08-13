const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },

    from: {
        type: Date,
        format: '%Y-%m-%d',
        required: true
    },

    to: {
        type: Date,
        format: '%Y-%m-%d',
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed'],
        maxlength: 10,
        maxlength: 7
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

    pickAddress: {
        type: String,
        maxlength: 200
    },

    addPrice: {
        type: Number,

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

    customerAdd: {
        type: String,
        maxlength: 200
    },

    contactNo: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10
    },

    NICcopy: {
        type: String,

    },

})

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;