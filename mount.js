const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const path = require("path");
const fs = require("fs");

;(async function main() {
    try {

        // await load_city_data();
        
        // await load_express_data();

        // await load_suburbs_data();

        const test_route1 = await db.traintest.create({
            depCity: ['busan', 'busan'].toString(),
            arrCity: [['busan', 'busan'], ['seoul', 'seoul']]
        })

        console.log(test_route1['arrCity'])
        destinations = test_route1['arrCity']
        for (var i = 0; i < destinations.length; i++) {
            console.log(destinations[i])
        }

    } catch (error) {
        console.error('Database mounting unsuccessful:', error)
    }
})()

async function read_csv(filePath) {

    var filePath = path.join(__dirname, filePath);

    console.log(filePath)
    
    var data = fs.readFileSync(filePath, {encoding: "utf8"});
    var rows = data.split("\n");
    var result = [];
        
    for (var rowIndex in rows) {
        var row = rows[rowIndex].split(",");

        if (rowIndex === "0") { var columns = row; } 

        else {
            var data = {}; // 빈 객체를 생성하고 여기에 데이터를 추가한다.
            for (var columnIndex in columns) { // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
                var column = columns[columnIndex];
                data[column] = row[columnIndex];
            }
            result.push(data);
        }
    }

    // console.log(result);
    return result
}

async function load_city_data() {

    // reading city data from a local csv file in data folder
    const city_data = await read_csv("data/city/city_population_latlng.csv");

    // pushing city data into city table in database
    for (var i = 0; i < city_data.length - 1; i++) {
        console.log(city_data[i])
        await db.City.create({
            sido: city_data[i]['sido'],
            sgg: city_data[i]['sgg'],
            population: city_data[i]['population'],
            latitude: city_data[i]['lat'],
            longitude: city_data[i]['long']
        })
    }

}

async function load_express_data() {

    // reading express bus terminal data from a local csv file in data folder
    const express_data = await read_csv("data/express/express_final.csv");

    // pushing express bus terminal data into express table in database
    for (var i = 0; i < express_data.length - 1; i++) {
        console.log(express_data[i])
        await db.Express.create({
            ...express_data[i]
        })
    }
}

async function load_suburbs_data() {

    // reading suburban bus terminale data from a local csv file in data folder
    const suburbs_data = await read_csv("data/suburbs/suburbs_preprocessed.csv");
        
    // pushing suburban bus terminal data into suburbs table in database
    for (var i = 0; i < suburbs_data.length - 1; i++) {
        // console.log(suburbs_data[i])
        await db.Suburbs.create({
            ...suburbs_data[i]
        })
    }
}


