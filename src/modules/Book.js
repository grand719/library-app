const mongoose = require("mongoose");
const shortid = require("shortid");


const Book = mongoose.model('Books', {
    _id: {
        type: String,
        default: shortid.generate
    },
    Title: {
        type: String,
        trim: true,
        required: true
    },
    Author: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        trim: true
    },
    // Book_ID: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     default: shortid.generate
    // },
    isRent: {
        type: Boolean,
        require: true,
        default: false
    }
})



module.exports = Book;