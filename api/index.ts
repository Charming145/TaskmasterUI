// const express = require("express");
// const app = express();
// const mainRoute = require("../routes/main");
// const userRoute = require("../routes/user");
// const mongoose = require("mongoose");
// // const path = require("path");

// // app.set("views", "../views");
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// // app.use(express.static("public"));
// // app.use(express.static(__dirname + "../public"));
// // app.set("views", __dirname + "/views");
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));
// if (process.env.NODE_ENV === "production") {
//   app.use((req, res, next) => {
//     if (req.header("x-forwarded-proto") !== "https") {
//       res.redirect(`https://${req.header("host")}${req.url}`);
//     } else {
//       next();
//     }
//   });
// }
// const URI = require("../config/keys").mongooseURI;
// mongoose
//   .connect(URI)
//   .then((conn) => {
//     if (conn != null) console.log("connection established.");
//   })
//   .catch((err) => console.log(err));
// app.use("/", mainRoute);
// app.use("/dashboard/user", userRoute);

// let port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`server running on port ${port}`));
