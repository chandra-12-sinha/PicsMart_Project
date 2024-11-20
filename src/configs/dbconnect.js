const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');
module.exports = async ()=>{
    try {
        const connect = await mongoose.connect(MONGO_URI, {
            serverApi:{
                version: ServerApiVersion.v1,
                strict:true,
                deprecationErrors:true
            }
        })
        console.log(`mongodb connected ${connect.connection.host}`);
        
    } catch (err) {
        console.log(err);
        process.exit(1)
        
    }
}