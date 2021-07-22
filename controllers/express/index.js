const { Router } = require('express');
const { route } = require('../../app');
const router = Router();
const ctrl = require('./express.ctrl');

router.get('/findall', ctrl.get_terminals);
// router.get('/count', ctrl.count_cities);
// router.post('/create', ctrl.create_city);

module.exports = router;