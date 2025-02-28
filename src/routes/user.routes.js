const express = require("express");
const userRouter = express.Router();
const { registerUser } = require("../controllers/user.controller");

router.get("/register", registerUser);

module.exports = userRouter;
