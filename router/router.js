const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Joi = require("@hapi/joi");
//Validation before creating a new user
const registerschema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
const loginschema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//Create a new User
router.post("/", async (req, res) => {
  //Lets Validate the data before we make a User
  const { error } = registerschema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  //Checking Email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Exists");

  //Hashing Passwords
  var salt = await bcrypt.genSaltSync(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.send(400).json({ success: false });
  }
});

//Logging User
router.post("/login", async (req, res) => {
  //Lets Validate the data before we make a User
  const { error } = loginschema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  //Checking Email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //Checking passwords
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Passwords not matched");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
