const express = require("express")

const router = express.Router()

const User = require("../models/user.model")

router.get("",async(req,res)=>{
    try{
        const users = await User.find().lean().exec()
        return res.status(201).send(users)
    } catch(err){
        return res.status(501).send({Error:err.message})
    }
})

module.exports = router;