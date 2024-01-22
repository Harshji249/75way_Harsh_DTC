const mongoose = require('mongoose')

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGOURI )
    .then(()=>{
        console.log("CONNECTED TO MONGO SUCCESSFULLY")
    }).catch((err:any)=>{
        console.log(err)
    })
}

module.exports = connectToMongo;