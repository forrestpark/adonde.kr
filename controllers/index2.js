const { Router } = require('express');
const axios = require('axios');
const router = Router()

router.get('/', (_, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("welcome to adonde.kr")
});

router.use('/express', require('./express'));
router.use('/suburbs', require('./suburbs'));
router.use('/city', require('./city'));
router.use('/train', require('./train'));
router.use('/search', require('./search'));
router.use('/user', require('./user'));
router.use('/place', require('./place'));
router.use('/auth', require('./auth'));


module.exports = router;