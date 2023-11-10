const createError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const config = require("./config");
const MQTTHandler = require("./MQTTHandler");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.options("*", cors());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// Routers 
app.use("/", indexRouter);
app.use("/users", userRouter);

// Connect to database
const mongoURI = process.env.MONGODB_URI || config.database;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB Atlas connection error:", err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const mqttHandler = new MQTTHandler(
  config.hivemq.URL,
  config.hivemq.Ussername,
  config.hivemq.Password
);

// Connect to the MQTT broker
mqttHandler.connect();

// Subscribe to a topic
mqttHandler.subscribe("flossbosstest");

// Publish a message to a topic
mqttHandler.publish("flossbosstest", "Hello Mqtt");

module.exports = app;
