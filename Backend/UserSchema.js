const mongoose = require("mongoose");
const bcrypt=require("bcrypt");

const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    pwd: {
        type: String,
        required: true,   
    }, 
    cpwd: {
        type: String,
        required: true,
    },
    purchase:{
        type:[String]
    },

})



userSchema.pre("save",async function (next){
    const salt=await bcrypt.genSalt();
        this.pwd=await bcrypt.hash(this.pwd,salt);
        this.cpwd=await bcrypt.hash(this.cpwd,salt);
    
    next();
})


const User = new mongoose.model("User", userSchema);
module.exports = User;