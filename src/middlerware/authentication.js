
module.exports.requireAuth = function(req,res,next){
    if(req.cookies.sdtlogin) next();
    else {
        res.redirect('/auth')
    }
}
