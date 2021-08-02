const { Router } = require('express');
const router = Router();
const ctrl = require('./search.ctrl');

router.post('/', ctrl.search);
router.post('/mount', ctrl.mount);
router.get('/test', ctrl.test);
// router.get('/distance', ctrl.use_distance)

module.exports = router;