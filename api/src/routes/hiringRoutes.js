const express = require("express");
const {
  createHiringRequirement,
} = require("../controllers/hiringController");

const router = express.Router();

router.post("/", createHiringRequirement);

module.exports = router;