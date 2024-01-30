const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
require("./src/Database/index");

const Scheduler = require("./src/Router/Scheduler");
const News = require("./src/Router/NewsRouter");
const MovieList = require("./src/Router/Movie");

const app = express();
// app.use(express.json());
app.use(cors()); 
const port = process.env.PORT || 8888;  

app.use("/News", News);
app.use("/Scheduler", Scheduler); 
app.use("/MovieList", MovieList); 


app.listen(port, () => {
    console.log(`Connection Started ${port}`);
})