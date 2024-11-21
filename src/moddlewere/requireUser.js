module.exports = async(req, res, next)=>{
    console.log('this is insode of middlewere');
    next()
    
}