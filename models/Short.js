const mongoose = require('mongoose');

const ShortSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "Short Text"
    },
    index:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    minChar:{
        type: Number,
        required: true
    },
    maxChar:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Short', ShortSchema);