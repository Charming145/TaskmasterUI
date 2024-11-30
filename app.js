const express = require("express");
const app = express();
const mainRoute = require("./routes/main");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}
const URI = require("./config/keys").mongooseURI;
mongoose
  .connect(URI)
  .then((conn) => {
    if (conn != null) console.log("connection established.");
  })
  .catch((err) => console.log(err));
app.use("/", mainRoute);
app.use("/dashboard/user", userRoute);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
