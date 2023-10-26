const express = require("express");
const databaseConnect = require("./config/database");
const cloudinaryConnect = require("./config/clodinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

databaseConnect();
cloudinaryConnect();

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});
