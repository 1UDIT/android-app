const mongoDB = require('mongoose');
const DB = process.env.MONGO_URI;

mongoDB.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("connection Successfully"))
.catch((err)=>console.log(err)); 


 