'use strict'

function isLogin (req,res,next){ 
    if(req.session.user) {
        next()  
    } else if (req.session.admin) { 
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = isLogin