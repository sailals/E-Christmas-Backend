const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const cloudinary = require("../Utility/cloudinary");

router.post("/", async (req, res) => {
  const { name, price, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineshop",
      });
      if (uploadRes) {
        const product = new Product({
          name,
          price,
          image: uploadRes,
        });
        const savedProduct = await product.save();

        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get Product Count

router.get("/productcount", async (req, res) => {
  try {
    const productcount = await Product.find().count();
    res.status(200).json(`${productcount}`);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
