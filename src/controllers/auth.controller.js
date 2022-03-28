require("dotenv").config();
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const { body, validationResult } = require('express-validator');

const EventEmitter = require("events")
const eventEmitter = new EventEmitter()
const path = require("path")
const transporter = require("../configs/mail")

const {verificationMail} = require("../configs/utils")

const newToken = (user)=>{
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}

const signup = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Errors: errors.array() });
        }

        let user = await User.findOne({email:req.body.email}).lean().exec()

        let otp = Math.floor(Math.random() * (9999 - 1000) ) + 1000
    
        if(user){
            const token = newToken(user)

            eventEmitter.on("User Registration",verificationMail)
            eventEmitter.emit("User Registration",{
                from:"admin@snapdeal.com",
                user,
                otp
            })

            return res.status(201).send({user,token,otp})
        }
    
        user = await User.create(req.body)
    
        const token = newToken(user)

        console.log({user,token})

        eventEmitter.on("User Registration",verificationMail)
        eventEmitter.emit("User Registration",{
            from:"admin@snapdeal.com",
            user,
            otp
        })
    
        return res.status(201).send({user,token,otp})
    } catch(err){
        return res.status(501).send({Error: err.message})
    }
}

module.exports = {signup,newToken}