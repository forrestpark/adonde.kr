const { Router } = require('express');
// const { route } = require('../../app');
const router = Router();
const ctrl = require('./place.ctrl');

router.get('/findAll', ctrl.get_all_places);
router.post('/findBySidoSgg', ctrl.get_places_by_sido_sgg);
router.post('/findByTheme', ctrl.get_places_by_theme);
router.post('/findBySidoSggAndTheme', ctrl.sort_places_by_theme_for_certain_city);
// router.post('/create', ctrl.create_city);
// router.put('/update', ctrl.update_city);
// router.delete('/delete', ctrl.delete_city);

module.exports = router;