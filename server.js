const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors());

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Book Directory API is running...");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
