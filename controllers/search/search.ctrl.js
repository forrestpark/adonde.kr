const {models, City, Express, Suburbs, Train} = require('../../models')
const db = require('../../models')
const {Op} = require('sequelize')
const axios = require('axios')

exports.test = async (req, res) => {

}

// overall filter that iterates through and checks all tables (city, express, suburbs, train)
exports.search = async (req, res) => {

    const {theme, distance, population, transportation, origin} = req.body

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

    // our transportation filter only supports direct transportation options at the moment
    if (transportation.length != 0) {
        // helper function
        if (transportation.includes("train_direct")) {
            cities = await filterByTrainDirect(cities, origin)
        }

        if (transportation.includes("express_direct")) {
            await filterByExpressDirect(cities, origin)
        }

        if (transportation.includes("suburbs_direct")) {
            cities = await filterBySuburbsDirect(cities, origin)
        }

    }

    return res.json(cities)

}

async function filterByExpressDirect(cities, origin) {

    // get all express bus terminals in city of origin
    const origin_terminals = await Express.findAll({
        where: {
            sido_sgg: origin
        },
        attributes: []
    })

    // if there does not exist any, return an empty list

    // if there exists at least one express bus terminal in city of origin,
    // iterate through all of such terminal(s) and run public openAPI calls for each

}

async function filterByTrainDirect(cities, origin) {

    var direct_train_destinations = await Train.findOne({
        where : {
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

        if ( cities_set.has(destination_sidosgg) == true ) {
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
            where : {
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
        where : {
            sido_sgg: origin
        },
        attributes: ['latitude', 'longitude']
    })

    // console.log("origin latlng: ", origin_lat, origin_lng)

    // we assume origin is a valid city entry, contained in the city table

    distance_filtered_list = []

    for (var i = 0; i < cities.length; i++) {

        var city = await City.findOne({
            where : {
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
    var rlat1 = orig_lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = dest_lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (dest_lng-orig_lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}