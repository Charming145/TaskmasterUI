require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/authMiddleware");

//getting all registered users
router.get("/", authUser, async (req, res) => {
  // res.json(req.user);
  res.render("dashboard/index");
});
router.get("/profile", authUser, async (req, res) => {
  res.render("dashboard/profile");
});
router.get("/new-task", authUser, async (req, res) => {
  res.render("dashboard/new-task");
});
router.get("/task-record", authUser, async (req, res) => {
  res.render("dashboard/task-record");
});
router.get("/settings", authUser, async (req, res) => {
  res.render("dashboard/new-task");
});

module.exports = router;
