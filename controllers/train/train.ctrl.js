const {models, Train} = require('../../models')

exports.get_all_trains = async (req, res) => {
    try {
        const trains = await Train.findAll()
        return res.json(trains)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_one_train = async (req, res) => {
    const {sido_sgg} = req.body
    try {
        const routes = await Train.findByPk(sido_sgg)
        return res.json(routes)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_train = async (req, res) => {
    const {sido, sgg, destinations, sido_sgg} = req.body
    try {
        const train = await Train.create({sido, sgg, destinations, sido_sgg})
        return res.json(train)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.delete_train = async (req, res) => {
    const {sido_sgg} = req.body
    try {
        const train = await Train.findByPk(sido_sgg)
        await train.destroy()
        return res.json(train)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.update_train = async (req, res) => {
    const {sido, sgg, destinations, sido_sgg} = req.body
    try {
        const train = await Train.findByPk(sido_sgg)
        train.sido = sido
        train.sgg = sgg
        train.destinations = destinations
        train.sido_sgg = sido_sgg

        await train.save()
        return res.json(train)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

// exports.name = async (req, res) => {
//     try {
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }