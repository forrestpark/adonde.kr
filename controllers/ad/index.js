// controllers/ad/index.js

const { Router } = require('express')
const router = Router()
const ctrl = require('./ad.ctrl')

router.get('/findAll', ctrl.get_all_ads)
router.get('/findOne/:id', ctrl.get_one_ad)
router.post('/create', ctrl.create_ad)
router.put('/update', ctrl.update_ad)
router.delete('/deleteById', ctrl.delete_ad)
router.get('/orderByRand', ctrl.get_ads_rand)
router.put('/updateView', ctrl.inc_view)
router.get('/user/findAll', ctrl.get_user_ads)


module.exports = router