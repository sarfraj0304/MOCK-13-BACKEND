const { Router } = require("express");
const { userModel } = require("../models/UserModel");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send({ data: data });
  } catch (error) {
    res.send({ error: error });
  }
});

userRouter.post("/signup", async (req, res) => {
  const { email, password, confirmPass } = req.body;
  try {
    const existUser = await userModel.find({ email: email });
    if (existUser.length > 0) {
      res.send({ msg: "user exist" });
    } else {
      if (confirmPass != password) {
        res.send({ msg: "password must be same" });
      } else {
        bcrypt.hash(password, 3, async (err, hash) => {
          if (err) {
            res.send({ msg: err });
          } else {
            const data = new userModel({
              email,
              password: hash,
              confirmPass: hash,
            });
            await data.save();
            res.send({ data: data, msg: "User Registered!" });
          }
        });
      }
    }
  } catch (error) {
    res.send({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await userModel.find({ email: email });
    if (existUser.length === 0) {
      res.send({ msg: "user not found" });
    } else {
      bcrypt.compare(password, existUser[0].password, async (err, result) => {
        if (!result) {
          res.send({ msg: "Wrong Cred" });
        } else {
          const token = jwt.sign({ userID: existUser[0]._id }, "mock13");

          res.send({ token: token, msg: "login success" });
        }
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = { userRouter };
