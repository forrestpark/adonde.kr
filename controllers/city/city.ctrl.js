const {models, City} = require('../../models')

exports.get_all_cities = async (req, res) => {
    try {
        const cities = await City.findAll()
        return res.json(cities)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_one_city = async (req, res) => {
    const {sido_sgg} = req.body
    try {
        const city = await City.findByPk(sido_sgg)
        return res.json(city)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_city = async (req, res) => {
    const {sido, sgg, population, latitude, longitude, sido_sgg} = req.body
    try {
        const city = await City.create({sido, sgg, population, latitude, longitude, sido_sgg})
        return res.json(city)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.update_city = async (req, res) => {
    const {sido, sgg, population, latitude, longitude, sido_sgg} = req.body
    try {
        const city = await City.findByPk(sido_sgg);
 
        city.sido = sido
        city.sgg = sgg
        city.population = population
        city.latitude = latitude
        city.longitude = longitude

        await city.save()

        return res.json(city)

    } catch (err) {

        console.log(err)
        return res.status(500).json(err)

    }
}

exports.delete_city = async (req, res) => {
    const {sido_sgg} = req.body
    try {
        const city = await City.findByPk(sido_sgg);
        await city.destroy()
        return res.json({message : 'City successfully deleted'})
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