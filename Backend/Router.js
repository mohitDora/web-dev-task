const express = require("express");
const Router = express.Router();
const User = require("./UserSchema");
const Data = require("./CourseSchema");
const bcrypt = require("bcrypt");
const {Auth}=require("./Auth")
var jwt = require('jsonwebtoken');
const cookie=require("cookie-parser")

Router.use(cookie())
  const maxAge=3*24*60*60;
    const createToken=(id)=>{
        return jwt.sign({id},"regret",{
            expiresIn:maxAge
        })
    } 

Router.post("/register",async(req,res)=>{
    const { email, pwd,cpwd } = req.body;
    
    if(!email || !pwd || !cpwd){
        return res.status(422).json({error:"plz fill all the field"})
    }
    try {
        const isPresent = await User.findOne({ email });
        
        if (isPresent) {
            return res.status(422).json({ error: "Already Present" });
        }
        const user = new User(req.body);
        
        await user.save();
        const token=createToken(user._id);
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json(user);
    } catch (error) {
        res.status(422).send(error)
    }
})
Router.post("/login", async (req, res) => {
    try {
        const { pwd, email } = req.body;
        const isPresent = await User.findOne({email});
     console.log(isPresent)
        let ismatch;
        if (isPresent) {
            // ismatch = await bcrypt.compare(pwd, isPresent.pwd);
            ismatch=(pwd===isPresent.pwd)?true:false;
            
        }
        if (ismatch && isPresent) {
            
            const token=createToken(isPresent._id);
            res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
            res.status(201).send(isPresent);
        }
        else {
            res.status(422).json("Incorrect credentials");
        }
    } catch (error) {
        res.status(422).send([]);
        console.log(error)
    }
})
Router.get("/data", async (req, res) => {
    try {
        const getdata = await Data.find({})
     
        const alllower=getdata.map(((item)=>{
            return item 
        }))
      
        res.status(201).send(getdata)
    } catch (error) {
        res.status(401).send([])
        
    }
})
Router.post("/data", async (req, res) => {
    const { name,description,instructor,duration,level,amount } = req.body;
    
   
    try {
        
        const user = new Data(req.body);
        
        await user.save();
        
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(422).send(error)
    }
})


Router.get("/validate",Auth,(req,res)=>{
    res.send("authenitication")
})

Router.delete("/data/:id", async (req, res) => {
    try {
        const _id = req.params.id
        console.log(_id)
        const getdata = await Data.findByIdAndDelete({ _id })
        res.status(200).send(getdata)
    } catch (error) {
        res.status(401).send([])
    }
})


module.exports = Router