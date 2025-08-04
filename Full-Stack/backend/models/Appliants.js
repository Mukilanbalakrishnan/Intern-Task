const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    mobile: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined'], 
        default: 'Pending'
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('applicant', ApplicantSchema);
