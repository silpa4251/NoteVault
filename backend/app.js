const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
  }));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

module.exports = app;
