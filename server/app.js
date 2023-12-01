require("dotenv").config();
const createError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const getMQTTHandler = require("./MQTTHandler");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const clinicRouter = require("./routes/clinic");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:3001"], // Replace with your frontend's URL
  credentials: true, // If your frontend needs to send credentials
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/clinics", clinicRouter);

// Connect to database
const mongoURI = process.env.MONGODB_URI;
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

const HOST = process.env.MQTT_URL;
const USERNAME = process.env.MQTT_USER;
const PASSWORD = process.env.MQTT_PASSWORD;

const mqttHandler = getMQTTHandler(HOST, USERNAME, PASSWORD);

// Connect to the MQTT broker
mqttHandler.connect();

// Subscribe to a topic
mqttHandler.subscribe("flossbosstest");

// Publish a message to a topic
mqttHandler.publish("flossbosstest", "Hello Mqtt");

module.exports = app;
