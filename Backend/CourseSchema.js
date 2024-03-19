const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    instructor: {
        type: String,
        required: true,   
    }, 
    duration: {
        type: String,
        required:true,
    },
    level: {
        type: String,
        required:true,
    },
    amount: {
        type: Number,
        required:true,
    },

})


const Data = new mongoose.model("Data", courseSchema);
module.exports = Data;