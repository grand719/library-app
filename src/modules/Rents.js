const mongoose = require("mongoose")

const Rents = mongoose.model('Rents', {
    User_Pesel: {
        type: String,
        required: true,
        trim: true,
        minlength: 11,
        maxlength: 11
    },
    Book_ID: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        trim: true,
    },
    Rent_Date: {
        type: Date,
        required: true,
        trim: true,
    },
    Rent_to: {
        type: Date,
        trim: true,
    }
})

module.exports = Rents;