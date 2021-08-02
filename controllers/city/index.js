const { Router } = require('express');
// const { route } = require('../../app');
const router = Router();
const ctrl = require('./city.ctrl');

router.get('/findAll', ctrl.get_all_cities);
router.post('/findOne', ctrl.get_one_city);
router.post('/create', ctrl.create_city);
router.put('/update', ctrl.update_city);
router.delete('/delete', ctrl.delete_city);

module.exports = router;