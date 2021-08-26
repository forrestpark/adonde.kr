const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.ctrl');
// require('../../auth')

// router.get('/google', ctrl.google_login);
// router.get('/google/callback', ctrl.google_callback);
router.get('', (req, res) => {
    return res.send("auth")
})

module.exports = router;