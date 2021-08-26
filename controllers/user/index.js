const { Router } = require('express');
const router = Router();
const ctrl = require('./user.ctrl');

router.get('/findAll', ctrl.get_all_users);
router.post('/findOneByEmail', ctrl.get_one_user_by_email);
router.post('/findOneById', ctrl.get_one_user_by_id);
router.post('/create', ctrl.create_user);
router.put('/update', ctrl.update_user);
router.delete('/deleteByEmail', ctrl.delete_user_by_email);
router.delete('/deleteById', ctrl.delete_user_by_id);
router.put('/addStoredCity', ctrl.addStoredCity);
router.put('/deleteStoredCity', ctrl.deleteStoredCity);
router.post('/login', ctrl.login);
router.post('/getStoredCitiesDetail', ctrl.getStoredCitiesDetail);

// router.post('/passport', ctrl.passport_login)

module.exports = router;