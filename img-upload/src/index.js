const express = require("express");
const { connect } = require("./config/db-config");
const { ServerConfig, DbConfig } = require("./config");
const apiRoutes = require("./routes");
DbConfig();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/info", (req, res) => {
  res.json({ message: "API is on in index.js" });
});
app.use("/api", apiRoutes);
app.listen(ServerConfig.PORT, () => {
  console.log(`Server is up and running on PORT ${ServerConfig.PORT}`);
});
