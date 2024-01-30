const express = require("express");

const router = express.Router();
const multer = require("multer"); 

const {  GetScheduler, FindDetail } = require("../Controller/Scheduler"); 

router.route("/").get(GetScheduler);
router.route("/data").get(FindDetail);


module.exports = router; 