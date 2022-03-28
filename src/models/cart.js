const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
 
productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required:true
      }],
   
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required:true
  }
},{
    versionKey:false
});




module.exports = mongoose.model("carts", cartSchema);