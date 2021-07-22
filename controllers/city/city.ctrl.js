const {models, City} = require('../../models')

exports.get_cities = async (req, res) => {
    try {
        const cities = await City.findAll()
        return res.json(cities)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_city = async (req, res) => {
    const {sido, sgg, population, latitude, longitude} = req.body
    try {
        const city = await City.create({sido, sgg, population, latitude, longitude})
        return res.json(city)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

// exports.count_cities = async (req, res) => {
//     res.json("Counting")
// }