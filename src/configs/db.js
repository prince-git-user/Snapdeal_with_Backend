const mongoose = require("mongoose")

module.exports =()=>{
    return mongoose.connect("mongodb+srv://linkan:linkan_123@cluster0.euhce.mongodb.net/gmailStore?retryWrites=true&w=majority")
}