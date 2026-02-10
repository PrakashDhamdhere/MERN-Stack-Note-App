const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected...");
    }).catch((err)=>{
        console.log(err.message);
    })
}

module.exports = connectToDB;