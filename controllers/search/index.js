const { Router } = require('express');
const router = Router();
const ctrl = require('./search.ctrl');

router.get('/', ctrl.search);
// router.get('/distance', ctrl.use_distance)

module.exports = router;