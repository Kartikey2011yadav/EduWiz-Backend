require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const teacherroutes = require("./routes/teacherroutes");

app.use(cors());
app.use(express.json());

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/teachers", teacherroutes);
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
