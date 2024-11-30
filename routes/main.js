require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

const maxAge = 3 * 24 * 60 * 60;
let createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: maxAge,
  });
};

router.post("/register", async (req, res) => {
  const data = req.body;

  try {
    let d = await User.findOne({ email: data.email });

    if (d) return res.json({ message: "Email Already Exist." });
    const user = new User({
      username: data.username,
      email: data.email,
    });
    bcrypt.hash(data.password, 10).then(async (hash) => {
      user.password = hash;
      let userSave = await user.save();
      // let token = createToken(userSave._id);
      // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ message: user._id });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User doesnt exist" });
  bcrypt.compare(req.body.password, user.password, (err, hash) => {
    if (err) return res.status(500).json("Password hashing failed.");
    if (!hash) return res.status(404).json({ message: "Password Incorrect." });
    let token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(200).json({ user: user._id });
  });
});

module.exports = router;
