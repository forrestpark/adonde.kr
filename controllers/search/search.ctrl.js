const { models, City, Express, Suburbs, Train } = require('../../models')
const db = require('../../models')
const { Op } = require('sequelize')
const axios = require('axios')

exports.test = async (req, res) => {
    const { theme, distance, population, transportation, origin } = req.body
    // get all sido_sgg values in city table
    try {
        var cities = await City.findAll({
            attributes: ['sido_sgg'],
            raw: true
        })

        // converting cities from an array of city objects to an array of sido_sgg values
        var sido_sgg_list = []
        for (var i = 0; i < cities.length; i++) {
            sido_sgg_list.push(cities[i]['sido_sgg'])
        }
        cities = sido_sgg_list

        return res.json(Array.from(await filterBySuburbsDirect(cities, origin)))

    } catch (err) {
        return res.status(500).json(err)
    }

}

// overall filter that iterates through and checks all tables (city, express, suburbs, train)
exports.mount = async (req, res) => {

    const { theme, distance, population, transportation, origin } = req.body

    try {
        // get all sido_sgg values in city table
        var cities = await City.findAll({
            attributes: ['sido_sgg'],
            raw: true
        })

        // converting cities from an array of city objects to an array of sido_sgg values
        var sido_sgg_list = []
        for (var i = 0; i < cities.length; i++) {
            sido_sgg_list.push(cities[i]['sido_sgg'])
        }
        cities = sido_sgg_list

        // if the population filter has been activated and given as parameter
        if (population.length != 0) {

            // calling a helper method filterByPopulation
            // and filters cities by population value
            cities = await filterByPopulation(cities, population)

        }

        if (distance.length != 0) {

            // helper function
            cities = await filterByDistance(cities, distance, origin)

        }

        const specialCities = ["서울 서울", "부산 부산", "인천 인천", "대구 대구", "대전 대전", "울산 울산", "광주 광주"]

        // our transportation filter only supports direct transportation options at the moment
        if (transportation.length != 0) {

            var intersection = await filterNonSpecialOrigin(transportation, cities, origin)
            
            // intersection = await filterNonSpecialOrigin(transportation, cities, origin)
            cities = Array.from(intersection)
        }

        // delete origin from response
        const origin_index = cities.indexOf(origin)
        if (origin_index != -1) {
            cities.splice(origin_index, 1)
        }

        const cities_with_coords_and_images = await completeCityObjects(cities)

        return res.json(cities_with_coords_and_images)
    } catch (err) {
        return res.status(500).json(err)
    }

}

// overall filter that iterates through and checks all tables (city, express, suburbs, train)
exports.search = async (req, res) => {

    const { theme, distance, population, transportation, origin } = req.body

    try {
        // get all sido_sgg values in city table
        var cities = await City.findAll({
            attributes: ['sido_sgg'],
            raw: true
        })

        // converting cities from an array of city objects to an array of sido_sgg values
        var sido_sgg_list = []
        for (var i = 0; i < cities.length; i++) {
            sido_sgg_list.push(cities[i]['sido_sgg'])
        }
        cities = sido_sgg_list

        console.log("population: ", population)
        console.log("population 0,1: ", population[0], population[1])

        // if the population filter has been activated and given as parameter
        if (population[0] == 0 && population[1] == 0) {
            // no reason to filter by population when no values are selected
            
        } else {
            // calling a helper method filterByPopulation
            // and filters cities by population value
            cities = await filterByPopulation(cities, population)
        }

        if (distance.length != 0) {

            // helper function
            cities = await filterByDistance(cities, distance, origin)

        }

        const specialCities = ["서울 서울", "부산 부산", "인천 인천", "대구 대구", "대전 대전", "울산 울산", "광주 광주"]

        // if (theme.length != 0) {

            // const cities_theme = await db.City.findAll({
            //     where : {
            //         mountains: theme.includes("mountains"),
            //         valleys: theme.includes("valleys"),
            //         rivers: theme.includes("rivers"),
            //         beaches: theme.includes("beaches"),
            //     }
            // })

            // console.log("cities_theme: ", cities_theme)

            // for (var themeIdx = 0; themeIdx < theme.length; themeIdx++) {
            //     var currTheme = theme[themeIdx]
            //     var cities = await db.City.findAll({
            //         where : {
                        
            //         }
            //     })
            // }
            // console.log("ready to combine")
            // const final_city_theme = cities_with_mountains.union(cities_with_valleys)
            // console.log("final_city_theme: ", final_city_theme)
        // }

        // our transportation filter only supports direct transportation options at the moment
        if (transportation.length != 0) {

            var intersection = new Set()

            if (specialCities.includes(origin)) {
                console.log("special city: ", origin)
                intersection = await filterSpecialOrigin(transportation, cities, origin)
            } else {
                intersection = await filterNonSpecialOrigin(transportation, cities, origin)
            }
            
            // intersection = await filterNonSpecialOrigin(transportation, cities, origin)
            cities = Array.from(intersection)
        }

        // delete origin from response
        const origin_index = cities.indexOf(origin)
        if (origin_index != -1) {
            cities.splice(origin_index, 1)
        }

        var cities_with_coords_and_images = await completeCityObjects(cities)

        cities_with_coords_and_images = filterByTheme(cities_with_coords_and_images, theme)

        return res.json(cities_with_coords_and_images)
    } catch (err) {
        return res.status(500).json(err)
    }

}

function filterByTheme(cities, themes) {
    if (themes.length == 0) {
        return cities
    }
    
    const isAlpha = str => /^[a-zA-Z]*$/.test(str);
    const theme_translate_ko2en = {"산": "mountains", "바다": "beaches", "계곡": "valleys", "강": "rivers"}
    var cities_set = new Set()
    for (var themeidx in themes) {
        for (var cityidx in cities) {
            var theme = themes[themeidx]
            if (!isAlpha(theme)) {
                theme = theme_translate_ko2en[theme]
            }
            var city = cities[cityidx]
            if (city[theme] == false) {
                continue
            } else {
                cities_set.add(city)
            }
        }
    }
    return Array.from(cities_set)
}

async function filterSpecialOrigin(transportation, cities, origin) {
    try {
        var train_cities_list = new Array()
        var express_cities_list = new Array()
        var suburbs_cities_list = new Array()

        // helper function
        if (transportation.includes("train_direct")) {
            console.log("train filter")
            train_cities_list = await filterByTrainDirect(cities, origin)
        }

        if (transportation.includes("express_direct")) {
            console.log("express filter")
            express_cities_list = await db.specialexpress.findOne({
                where : {
                    sido_sgg : origin
                },
                attributes: ['destinations'],
                raw: true
            })
        }

        express_cities_list = express_cities_list['destinations']

        console.log("express cities list: ", express_cities_list)

        if (transportation.includes("suburbs_direct")) {
            console.log("suburbs filter")
            suburbs_cities_list = await db.specialsuburbs.findOne({
                where : {
                    sido_sgg : origin
                },
                attributes: ['destinations'],
                raw: true
            })
        }
        
        console.log("suburbs filter done")
        console.log("suburbs cities list: ", suburbs_cities_list)

        suburbs_cities_list = suburbs_cities_list['destinations']

        console.log("suburbs cities list: ", suburbs_cities_list)

        var train_cities_set = new Set(train_cities_list)
        var express_cities_set = new Set(express_cities_list)
        var suburbs_cities_set = new Set(suburbs_cities_list)

        // union all three transportation sets
        const transportation_union = train_cities_set.union(express_cities_set).union(suburbs_cities_set)

        console.log("transport union: ", transportation_union)

        // compute the intersection of transportation union and cities
        const cities_set = new Set(cities)
        const intersection = new Set([...cities_set].filter(x => transportation_union.has(x)));

        return intersection
    } catch (err) {
        return res.json(err)
    }
}

async function filterNonSpecialOrigin(transportation, cities, origin) {
    var train_cities_list = new Array()
    var express_cities_set = new Set()
    var suburbs_cities_set = new Set()

    // helper function
    if (transportation.includes("train_direct")) {
        console.log("train filter")
        train_cities_list = await filterByTrainDirect(cities, origin)
    }

    if (transportation.includes("express_direct")) {
        console.log("express filter")
        express_cities_set = await filterByExpressDirect(cities, origin)
    }

    if (transportation.includes("suburbs_direct")) {
        console.log("suburbs filter")
        suburbs_cities_set = await filterBySuburbsDirect(cities, origin)
    }

    var train_cities_set = new Set(train_cities_list)

    // union all three transportation sets
    const transportation_union = train_cities_set.union(express_cities_set).union(suburbs_cities_set)

    // compute the intersection of transportation union and cities
    const cities_set = new Set(cities)
    const intersection = new Set([...cities_set].filter(x => transportation_union.has(x)));

    return intersection
}

async function completeCityObjects(cities) {

    var complete_cities = []

    for (var i = 0; i < cities.length; i++) {
        var sido_sgg = cities[i]

        var complete_city = await City.findOne({
            where: { sido_sgg },
            raw: true
        })

        complete_cities.push(complete_city)
    }

    return complete_cities

}

// set union operation
Set.prototype.union = function (setB) {
    var union = new Set(this);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
}

async function filterBySuburbsDirect(cities, origin) {

    // get all express bus terminals in city of origin
    const origin_terminals = await Suburbs.findAll({
        where: {
            sido_sgg: origin
        },
        attributes: ['id'],
        raw: true
    })

    console.log("origin terminals: ", origin_terminals)

    // if there does not exist any, return an empty list
    if (origin_terminals.length == 0) {
        return new Set()
    }

    var destination_terminal_name_set = new Set()
    var destination_city_set = new Set()

    // if there exists at least one express bus terminal in city of origin,
    // iterate through all of such terminal(s) and run public openAPI calls for each
    for (var i = 0; i < origin_terminals.length; i++) {
        // console.log("count: ", i)
        var origin_terminal_id = origin_terminals[i]['id']

        request_url = completeSuburbsURL(origin_terminal_id)

        // call OpenAPI
        res = await axios.get(request_url)

        var totalCount = res.data.response.body.totalCount

        if (totalCount == 0) {
            continue
        }

        var destination_terminals = res.data.response.body.items.item

        for (var j = 0; j < destination_terminals.length; j++) {
            destination_terminal_name_set.add(destination_terminals[j]['arrPlaceNm'])
        }

    }

    for (let destination_terminal_name of destination_terminal_name_set) {
        var destination_city = await Suburbs.findOne({
            where: {
                name: destination_terminal_name
            },
            attributes: ['sido_sgg'],
            raw: true
        })

        if (destination_city != null) {
            destination_city_set.add(destination_city['sido_sgg'])
        } else {
            console.log("else: ", destination_terminal_name)
        }

    }

    return destination_city_set

}

function completeSuburbsURL(id) {
    const base_url = "http://openapi.tago.go.kr/openapi/service/SuburbsBusInfoService/getTrminlAcctoSuberbsBusInfo?ServiceKey=YIG48RZ4OVNbB15tDMQv6%2FS4eDc38APYyyBkaUCB%2BnrBCbtm7l1hpnNDmVQ1p4RXGoQC7GYdXhpYgoPn%2FIzZww%3D%3D&depPlandTime=20210706&numOfRows=1000&terminalId="
    return base_url + id
}

async function filterByExpressDirect(cities, origin) {

    // get all express bus terminals in city of origin
    const origin_terminals = await Express.findAll({
        where: {
            sido_sgg: origin
        },
        attributes: ['id'],
        raw: true
    })

    console.log("origin terminals: ", origin_terminals)

    // if there does not exist any, return an empty list
    if (origin_terminals.length == 0) {
        return new Set()
    }

    var destination_terminal_id_set = new Set()
    var destination_city_set = new Set()

    // if there exists at least one express bus terminal in city of origin,
    // iterate through all of such terminal(s) and run public openAPI calls for each
    for (var i = 0; i < origin_terminals.length; i++) {
        // console.log("count: ", i)
        var origin_terminal_id = origin_terminals[i]['id']
        var origin_terminal_number = origin_terminal_id.slice(origin_terminal_id.length - 3, origin_terminal_id.length)

        request_url = completeExpressURL(origin_terminal_number)

        // call OpenAPI
        res = await axios.get(request_url)
        // console.log("calling api")
        var totalCount = res.data.response.body.totalCount

        if (totalCount == 0) {
            continue
        }

        var destination_terminals = res.data.response.body.items.item

        for (var j = 0; j < destination_terminals.length; j++) {
            destination_terminal_id_set.add(destination_terminals[j]['arrTmnCd'])
        }

    }

    for (let destination_terminal_id of destination_terminal_id_set) {
        var destination_city = await convertExpressIDToSidoSgg(destination_terminal_id)

        if (destination_city != null) {
            destination_city_set.add(destination_city['sido_sgg'])
        } else {
            console.log("else: ", destination_terminal_id)
        }

    }

    // const cities_set = new Set(cities)
    // destination_city_set = new Set( [...cities_set].filter(x => destination_city_set.has(x)));

    return destination_city_set

}

async function convertExpressIDToSidoSgg(id) {
    const expressID = "NAEK" + id.toString()
    const city = await Express.findOne({
        where: {
            id: expressID
        },
        attributes: ['sido_sgg'],
        raw: true
    })
    return city
}

function completeExpressURL(origin_terminal_number) {
    const base_url = "http://openapi.tago.go.kr/openapi/service/ExpBusArrInfoService/getArrTmnFromDepTmn?numOfRows=1000&ServiceKey=YIG48RZ4OVNbB15tDMQv6%2FS4eDc38APYyyBkaUCB%2BnrBCbtm7l1hpnNDmVQ1p4RXGoQC7GYdXhpYgoPn%2FIzZww%3D%3D&depTmnCd="
    return base_url + origin_terminal_number
}



async function filterByTrainDirect(cities, origin) {

    var direct_train_destinations = await Train.findOne({
        where: {
            sido_sgg: origin
        },
        attributes: ['destinations'],
        raw: true
    })

    // return an empty list if city of origin does not have a train station
    // if not returned even after this, that means the city of origin has a train station
    if (direct_train_destinations == null) {
        return []
    }

    // cleaning destinations data
    direct_train_destinations = direct_train_destinations['destinations']
    const cities_set = new Set(cities)

    var direct_train_destinations_list = []
    var destination_sidosgg = ""

    for (var i = 0; i < direct_train_destinations.length; i++) {

        // concatenating sido value and sgg value to make sido_sgg value
        destination_sidosgg = sido_sgg_concat(direct_train_destinations[i])

        if (cities_set.has(destination_sidosgg) == true) {
            direct_train_destinations_list.push(destination_sidosgg)
        }
    }

    return direct_train_destinations_list

}

function sido_sgg_concat(city) {
    return city[0] + " " + city[1]
}

async function filterByPopulation(cities, population) {

    // population values are in 10,000 units
    const minPopulation = population[0] * 10000
    const maxPopulation = population[1] * 10000

    population_filtered_list = []

    for (var i = 0; i < cities.length; i++) {

        var population_filtered_city = await City.findOne({
            where: {
                sido_sgg: cities[i],
                population: {
                    [Op.gte]: minPopulation,
                    [Op.lte]: maxPopulation,
                }
            },
            attributes: ['sido_sgg']
        })

        if (population_filtered_city != null) {
            population_filtered_list.push(population_filtered_city['sido_sgg'])
        }

    }

    return population_filtered_list

}

async function filterByDistance(cities, distance, origin) {

    const originCity = await City.findOne({
        where: {
            sido_sgg: origin
        },
        attributes: ['latitude', 'longitude']
    })

    // console.log("origin latlng: ", origin_lat, origin_lng)

    // we assume origin is a valid city entry, contained in the city table

    distance_filtered_list = []

    for (var i = 0; i < cities.length; i++) {

        var city = await City.findOne({
            where: {
                sido_sgg: cities[i]
            },
            attributes: ['sido_sgg', 'latitude', 'longitude'],
            raw: true
        })

        console.log(city['latitude'], city['longitude'])
        // calculate lineal distance between city of origin and that of destination
        var linealDistance = haversine_distance(originCity['latitude'], originCity['longitude'], city['latitude'], city['longitude'])
        console.log(city['sido_sgg'], linealDistance)
        // if the calculated lineal distance between the two cities is within the given distance range,
        // then add current searched city to return list
        if (linealDistance <= distance) {
            distance_filtered_list.push(city['sido_sgg'])
        }

    }

    return distance_filtered_list
}

function haversine_distance(orig_lat, orig_lng, dest_lat, dest_lng) {
    var R = 6371.0710; // Radius of the Earth in kilometers
    var rlat1 = orig_lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = dest_lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (dest_lng - orig_lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}