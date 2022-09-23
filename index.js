const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.json({ limit: "25mb" }));

// Routes Imports
const ProductRoute = require("./routes/products");
const RegisterRoute = require("./routes/register");
const LoginRoute = require("./routes/login");
const OrderRoute = require("./routes/order_r");
const UserRoute = require("./routes/users");

app.get("/", (req, res) => {
  res.status(200).json("Welcome to E-Christmas ....");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Mongo DB Atlas Successfully"))
  .catch((err) => console.log(err));

app.use("/api/products", ProductRoute);
app.use("/api/register", RegisterRoute);
app.use("/api/login", LoginRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/users", UserRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at ${port} ...`);
});
