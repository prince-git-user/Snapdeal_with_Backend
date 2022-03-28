const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
   required:true,
  },

  size:[{
    type: String,
    
  }],
  color:[{
    type: String, 
  }],
  rating: {
    type: Number,
    required: true,
    min:0,
    max:5
  },
   review: {
    type: Number,
    required: true,
    min:0,
    max:10000
  },
  count:{type:Number,required:true,default:1}
},{
  versionKey:false,
  timestamps:true
});

module.exports = mongoose.model("products", productSchema);
