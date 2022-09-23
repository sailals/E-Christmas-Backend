const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Total user count

router.get("/usercount", async (req, res) => {
  try {
    const usercount = await User.find().count();
    res.status(200).json(`${usercount}`);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
