const express = require("express");
const cors = require("cors");
const app = express();
const apiRoutes = require("./routes/allRoutes");

// middleware
app.use(cors());
app.use(express.json()); // using json data
app.use(express.urlencoded({ extended: true }));

// home
app.get("/", (req, res) => {
  res.json({ msg: "Hie" });
});

// testing database conection
// const db = require("./model/index");
// const sequelize = db.sequelize;

app.use("/", apiRoutes);

// define a port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
