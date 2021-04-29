const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/PostRoutes");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(allowCrossDomain);
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.use('/uploads',express.static('uploads'))

app.listen(process.env.PORT, () =>
  console.log(`server is running in port ${process.env.PORT}`)
);

mongoose
  .connect(
    "mongodb+srv://oussamabasry:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.yyo2r.mongodb.net/" +
      process.env.MONGO_ATLAS_DATABASE_NAME +
      "?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.error("not connected to db"));
