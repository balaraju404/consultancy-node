require("./app/utils/config");
require("./app/utils/constants");
const { connectDB } = require("./app/mongoose")

const express = require("express");
const app = express();

app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form data

const router = require("./app/routers"); // Routes
app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
 try {
  // Await DB connection setup
  await connectDB();
  console.log(`Server is running on port ${port}`);
 } catch (err) {
  console.error("Failed to connect to DB:", err);
  process.exit(1); // Exit the app if DB connection fails
 }
});
