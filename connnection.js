const mongoose=require("mongoose");

async function ConnectToMOngoDB(url) {
    return mongoose.connect(url)
    
}

module.exports={
    ConnectToMOngoDB
}