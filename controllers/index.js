const { Router } = require('express');
const router = Router()

router.get('/', (_, res) => {
    res.send("welcome to adonde.kr")
});

module.exports = router;