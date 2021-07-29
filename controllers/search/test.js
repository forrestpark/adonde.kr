const {models, City, Express, Suburbs, Train} = require('../../models')
const db = require('../../models')
const {Op} = require('sequelize')
const axios = require('axios')

exports.use_distance = async (req, res) => {
    const distance = haversine_distance(37.566534999999995, 126.9779692, 35.17955429999999, 129.07564159999998)
    console.log(distance)
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