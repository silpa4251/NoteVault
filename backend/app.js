const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewres/errorHandler");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoute");
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.use(errorHandler);

module.exports = app;
