const express = require("express");
const router = express.Router()
const Product = require("../models/product")



// post product
router.post("", async (req, res) => {

    try {
        const product = await Product.create(req.body)

        return res.send( product )
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
})
router.put("", async (req, res) => {

    try {
        const product = await Product.updateMany({},{count:1},{new:true})

        return res.send( product )
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
})

//find product by category or all products
//if you want to sort all products you have to give /products/All Products/1
//if you want to sort all products in category you have to give /products/category/sort order?page==3&size=20
router.get("/:category/:sort", async (req, res) => {

    try {
        const category =req.params.category
        let q={category}
       
        if(q.category=="All Products"){
            q={}
        }
let sort={createdAt:-1}
      if(req.params.sort!=="null"){

        sort={price:req.params.sort}
      }
      

        const page = req.query.page || 1;
        const size = req.query.size || 15;
        const products = await Product.find(q).sort(sort)
        .skip((page - 1) * size).limit(size).lean().exec()

        const totalpage = Math.ceil((await Product.find(q).countDocuments()) / size)

        return res.send({ products, totalpage })
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
})
//get product by id

router.get("/:id", async (req, res) => {

    try {
        const q = {_id:req.params.id}
        const product = await Product.findById(q).lean().exec()

        return res.send( product)
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
})

router.put("/:id", async (req, res) => {

    try {
        const q = {_id:req.params.id}
        const product = await Product.findByIdAndUpdate(q,req.body,{new:true}).lean().exec()

        return res.send( product)
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
})




module.exports = router