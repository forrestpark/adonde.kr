const { Router } = require('express');
const { route } = require('../../app');
const router = Router();
const ctrl = require('./city.ctrl');

// router.get('/findall', ctrl.get_cities);
// router.get('/count', ctrl.count_cities);
// router.post('/create', ctrl.create_city);

module.exports = router;