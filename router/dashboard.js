const express = require("express");
const router = express.Router();
const verify = require("../router/verifyToken");

//Private
router.get("/", verify, (req, res) => {
  res.json({ data: "private" });
});

module.exports = router;
