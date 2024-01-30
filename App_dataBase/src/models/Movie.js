const mongoose = require("mongoose");

const MovieModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Studio: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    Streaming: {
        type: String,
        required: false
    },
    profile_img: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ApiModel = new mongoose.model("MovieList", MovieModel);

module.exports = ApiModel;