const express = require("express");
const genAuthToken = require("../Utility/genAuthToken");
const Joi = require("joi");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(300).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid Username or Password");
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(400).send("Invalid Password or Username");
  }

  const token = genAuthToken(user);

  res.send(token);
});

module.exports = router;
