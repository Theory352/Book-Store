const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { PORT, mongoURI } = require("./config");
const bookRoutes = require("./routes/booksRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server Working");
});

// route

app.use("/books", bookRoutes);

// for connecting server and database

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database is active");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("Server is running ..");
});
