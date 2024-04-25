const express = require("express");
const Router = express.Router();
const { upload } = require("./upload");
const controller = (req, res) => {
  console.log("request received is ", req);
  res.status(200).json({ msg: "successfully stored image" });
};
Router.get("", (req, res) => {
  res.json({
    message: "API is live",
  });
});
Router.get("/images", express.static("./public"));
Router.post("/", upload.single("file"), controller);

module.exports = Router;
