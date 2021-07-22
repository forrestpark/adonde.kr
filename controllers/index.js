const { Router } = require('express');
const router = Router()

router.get('/', (_, res) => {
    res.send("welcome to adonde.kr")
});

router.use('/express', require('./express'));
router.use('/suburbs', require('./suburbs'));

module.exports = router;