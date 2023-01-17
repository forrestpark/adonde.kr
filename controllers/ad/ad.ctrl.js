const {models, Ad} = require('../../models')

exports.get_all_ads = (req, res) => {
    console.log('logging models...')
    console.log(models)
    console.log('logging Ad..')
    console.log(Ad)
    Ad.findAll()
        .then((data) => {
            //console.log(data)
            res.status(200)
            res.send(data)
        }).catch((err) => {
            console.log(err)
            return res.status(500).json(err)
        })
}

exports.get_one_ad = (req, res) => {
    //console.log(req.params.id)
    Ad.findOne({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        //console.log(data)
        res.status(200)
        res.send(data)
    }).catch((err) => {
            console.log(err)
            return res.status(500).json(err)
    })
}

exports.create_ad = (req, res, next) => {

    Ad.findOne({
        order: [ [ 'id', 'DESC' ]],
    }).then(async(ad) => {
        res.locals.lastID = ad?ad.id:0
        req.body['id'] = res.locals.lastID + 1
        req.body['views'] = 0
        req.body['createdAt'] = Date.now()
        req.body['updatedAt'] = Date.now()
        console.log(`logging new req.body...\n\n\n`)

        console.log(req.body)

        await Ad.create(req.body)

    }).then(() => {
        res.status(200)
        //This will have to change upon deployment
        res.redirect('http://localhost:8080/main')
    }).catch((err) => {
        console.log(err)
        return res.status(500).json(err)
    })
}

exports.update_ad = async (req, res) => {
    console.log('logging body...\n\n')
    console.log('update received..\n\n')
    console.log(req.body)
    const adToUpdate = await Ad.findOne({
        where: {
            id: req.body.id
        }
    })
    req.body['updatedAt'] = Date.now()
    adToUpdate.set(req.body)
    await adToUpdate.save()
    // res.send({
    //     "isSuccess": true,
    //     "message": "광고 update 성공",
    // })

    console.log('done...\n\n')
    res.redirect('http://localhost:8080/main')
    
}

exports.delete_ad = async(req, res) => {
    console.log('delete requested...\n\n')
    console.log(req.body)
    const adToDelete = await Ad.findOne({
        where: {
            id: req.body.id
        }
    })
    await adToDelete.destroy()
    res.status(200)
    res.send({
        "isSuccess": true,
        "message": '광고 삭제 성공'
    })
}

exports.get_ads_rand = (req, res) => {
    resData = {
        "isSuccess": true,
    }
    adArray = []
    Ad.findAll()
    .then((data) => {
        data.forEach((ad) => {
            adArray.push(ad.dataValues)
        })
        temp = adArray.sort(randomSort)
        console.log(temp)
        resData["data"] = temp
        res.send(resData)
    }).catch(err => console.log(err))
}

//randomSort helper function
function randomSort(ad1, ad2){
    return 0.5 - Math.random()
}

exports.inc_view = async (req, res) => {
    adToUpdate = await Ad.findOne({
        where: {
            id:req.body.id
        }
    })
    temp = {
        "views": adToUpdate.dataValues.views + 1
    }
    adToUpdate.set(temp)
    await adToUpdate.save()
    res.send({
        "isSuccess":true,
        "message": 'view update 성공'
    })
}

exports.get_user_ads = async (req, res) => {

    console.log('put received...\n\n\n\n')

    resData = {
        "isSuccess": true
    }
    adArray = []
    Ad.findAll({ 
        where: {
            userID: req.body.userID
        }
    }).then((data) => {
        //console.log('logging data...\n\n')
        //console.log(data)
        res.send(data)
        // data.forEach((ad) => {
        //     adArray.push(ad.dataValues)
        // })
        // resData["data"] = adArray
        // res.send(resData)
    }).catch(err => console.log(err))
}