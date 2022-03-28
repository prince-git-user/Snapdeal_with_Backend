const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");

router.post("/:id/:user", async (req, res) => {
  try {
    const query = { userId: req.params.user };
    const result = await Cart.findOne(query).lean().exec();
    if(!result){
      const products = await Cart.create({
        productIds: [req.params.id],
        userId: req.params.user,
      })
        .populate("productIds")
        .populate("userId");
  
      return res.send(products);
    }
    var updateDocument;
    if(!result.productIds.find((ele)=>(ele==req.params.id))){
      updateDocument = {
        $push: { productIds: req.params.id },
      };
    }else{
      return res.send(result);
    }
    const p = await Cart.findOneAndUpdate(query, updateDocument, {
      new: true,
    })
      .populate("productIds")
      .populate("userId")
      .lean()
      .exec();

      return res.send(p);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("", async (req, res) => {
  try {
    const products = await Cart.find()
      .populate("productIds")
      .populate("userId")
      .lean()
      .exec();

    return res.send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const products = await Cart.find({userId:req.params.id})
      .populate("productIds")
      .populate("userId")
      .lean()
      .exec();

    return res.send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const products = await Cart.findOneAndDelete({ userId: req.params.id })
      .lean()
      .exec();

    return res.send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const products = await Cart.findOneAndUpdate({ userId: req.params.id },req.body)
      .lean()
      .exec();

    return res.send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
module.exports = router;
