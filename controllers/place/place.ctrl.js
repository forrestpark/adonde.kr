const {models, Place} = require('../../models')

exports.get_all_places = async (req, res) => {
    try {
        const places = await Place.findAll()
        return res.json(places)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_places_by_sido_sgg = async (req, res) => {
    const {sido_sgg} = req.body
    try {
        const places = await Place.findAll({
            where : {
                sido_sgg : sido_sgg
            }
        })
        return res.json(places)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_places_by_theme = async (req, res) => {
    const {theme} = req.body
    try {
        const places = await Place.findAll({
            where : {
                theme : theme
            }
        })
        return res.json(places)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.sort_places_by_theme_for_certain_city = async (req, res) => {
    var mountain_list = new Array()
    var valley_list = new Array()
    var beach_list = new Array()
    var river_list = new Array()

    const {sido_sgg} = req.body
    try {
        // all places in given city
        const places = await Place.findAll({
            where : {
                sido_sgg : sido_sgg
            },
            raw: true
        })

        for (var i = 0; i < places.length; i++) {
            
            var theme = places[i].theme
            // console.log("theme: ", theme)
            // console.log("place: ", places[i])
            switch (theme) {
                case "산":
                    mountain_list.push(places[i])
                    break
                case "계곡":
                    valley_list.push(places[i])
                    break
                case "해변":
                    beach_list.push(places[i])
                    break
                case "강":
                    river_list.push(places[i])
                    break
            }
        }

        const allCombined = {"mountains" : mountain_list, "valleys" : valley_list, "beaches" : beach_list, "rivers" : river_list}

        return res.json(allCombined)

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


// exports.name = async (req, res) => {
//     try {
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }