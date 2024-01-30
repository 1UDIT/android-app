const express = require("express"); 

const router = express.Router(); 
const { getNews } = require("../Controller/NewsList"); 

router.route("/").get(getNews); 
 

module.exports = router; 