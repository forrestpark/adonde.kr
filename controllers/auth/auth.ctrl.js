const {models} = require('../../models')
// const passport = require('../../auth')
// var passport = require('passport')


exports.google_login = (req, res, next) => {
    // res.send("google oauth")
    console.log("google login")
    passport.authenticate('google', { scope: ['profile'] });
    console.log("authenticated")
    // return res.send("done")
}

exports.google_callback = (req, res) => {
    res.send("callback")
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
}
  

// exports.name = async (req, res) => {
//     try {
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }