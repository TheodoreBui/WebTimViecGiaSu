
module.exports.requireAuth = function(req,res,next){
    if(req.cookies.user) next();
    else {
        res.redirect('/auth')
    }
}
module.exports.requireAuthAdmin = function(req,res,next){
    if(req.cookies.admin) next();
    else {
        res.redirect('/auth')
    }
}