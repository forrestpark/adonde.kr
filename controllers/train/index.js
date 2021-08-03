const { Router } = require('express');
// const { route } = require('../../app');
const router = Router();
const ctrl = require('./train.ctrl');

router.get('/findAll', ctrl.get_all_trains);
router.post('/findOne', ctrl.get_one_train);
router.post('/create', ctrl.create_train);
router.put('/update', ctrl.update_train);
router.delete('/delete', ctrl.delete_train);

module.exports = router;
