const express = require("express");

const router = express.Router();
const { getAllList, getmovie } = require("../Controller/Movie");

router.route("/").get(getAllList);
router.route("/list").get(getmovie);


module.exports = router; 