const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/university",{
    
    useNewUrlParser:true,

    useUnifiedTopology: true 

}).then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY!")
}).catch(()=>{
    console.log("NO CONNECTION WITH THE DATABASE")
})
// mongodb://localhost:27017?connectTimeoutMS=300000/university