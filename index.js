const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/PostRoutes");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () =>
  console.log(`server is running in port ${process.env.PORT}`)
);

mongoose
  .connect(process.env.DATA_BASE_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.error("not connected to db"));
