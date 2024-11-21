const mongoose = require('mongoose')
const { purge } = require('../routers')
const postSchema = mongoose.Schema({
    owener:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    image:{
        publicId:String,
        url:String
    },
    caption:{
        type:String,
        required:true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
},{
    timestamp: true
}
)

module.exports = mongoose.model('post', postSchema)