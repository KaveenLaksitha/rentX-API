const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema)
module.exports = Inquiry;