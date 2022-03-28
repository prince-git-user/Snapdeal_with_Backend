const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:{type:String, required:false},
        email:{type:String, required:true},
        // totalPrice:{type:String, required:false}
    },{
        versionKey:false,
        timestamps:true
    }
)

module.exports = mongoose.model("users",userSchema)