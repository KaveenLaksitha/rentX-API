const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const removedRentalSchema = new Schema({

    id: {
        type: String,
        required: true,
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

    },

    status: {
        type: String,
        enum: ['completed'],
    },


    vehicleType: {
        type: String,
    },

    model: {
        type: String,
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
    },

    penaltyDays: {
        type: Number,

    },

    penaltyCharges: {
        type: Number,
    },

    lastPaid: {
        type: Number,
    }
})

const RemovedRental = mongoose.model("RemoveRental", removedRentalSchema);

module.exports = RemovedRental;