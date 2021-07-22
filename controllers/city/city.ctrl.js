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

// exports.create_city = async (req, res) => {
//     const {name, population, citycode, province, latitude, longitude} = req.body
//     try {
//         const city = await City.create({name, population, citycode, province, latitude, longitude})
//         return res.json(city)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }

// exports.count_cities = async (req, res) => {
//     res.json("Counting")
// }