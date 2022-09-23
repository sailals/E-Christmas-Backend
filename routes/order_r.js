const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Order = require("../models/order");
const moment = require("moment");

//Post Orders -- CheckOut Page

router.post("/", async (req, res) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    cartItems: Joi.array().required(),
    total: Joi.number().required(),
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    cardno: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const order = new Order({
    userId: req.body.userId,
    cartItems: req.body.cartItems,
    total: req.body.total,
    fullName: req.body.fullName,
    address: req.body.address,
    city: req.body.city,
    cardno: req.body.cardno,
  });
  await order.save();

  res.status(200).send(order);
});

// Get Orders

router.get("/ordercount", async (req, res) => {
  try {
    const order = await Order.find().count();
    res.status(200).json(`${order}`);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const query = req.query.new;

  try {
    const order = query
      ? await Order.find().sort({ _id: -1 }).limit(4)
      : await Order.find().sort({ _id: -1 });
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Income till now

router.get("/income", async (req, res) => {
  try {
    const income = await Order.aggregate([
      {
        $match: {},
      },

      {
        $group: {
          _id: { $year: "$createdAt" },
          totalAmount: { $sum: "$total" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// To get orders of particular user

router.get("/getorders/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Order.find({ userId: id });
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
