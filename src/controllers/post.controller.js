const { success } = require("../utils/responseWrapper")

const getAllPOst = async(req,res)=>{
    return res.send(success(200, 'here are all of the post'))
}

module.exports= {
    getAllPOst
}