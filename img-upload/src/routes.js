const express = require("express");
const Router = express.Router();
const { upload } = require("./upload");
const controller = (req, res) => {
  console.log("request received is ", req);
};
Router.get("", (req, res) => {
  res.json({
    message: "API is live",
  });
});
Router.post("/", upload.single("image"), controller);

module.exports = Router;
