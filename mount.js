const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const path = require("path");
const fs = require("fs");

;(async function main() {
    try {
        
        // // reading city data from a local csv file in data folder
        // const city_data = await read_csv("data/city/city_population_latlng.csv");

        // // pushing city data into city table in database
        // for (var i = 0; i < city_data.length - 1; i++) {
        //     console.log(city_data[i])
        //     await db.City.create({
        //         sido: city_data[i]['sido'],
        //         sgg: city_data[i]['sgg'],
        //         population: city_data[i]['population'],
        //         latitude: city_data[i]['lat'],
        //         longitude: city_data[i]['long']
        //     })
        // }
        
        // reading express bus terminal data from a local csv file in data folder
        const express_data = await read_csv("data/express/express_info.csv");

        // pushing city data into city table in database
        for (var i = 0; i < express_data.length - 1; i++) {
            console.log(express_data[i])
            await db.Express.create({
                id: express_data[i]['terminal_id'],
                name: express_data[i]['terminal_name'],
                sido: express_data[i]['sido'],
                sgg: express_data[i]['orig_sido'],
            })
        }

        // // reading city data from a local csv file in data folder
        // const city_data = await read_csv("data/city/city_population_latlng.csv");

        // // reading city data from a local csv file in data folder
        // const city_data = await read_csv("data/city/city_population_latlng.csv");

        // console.log("city_data: ", city_data)

        // const dummy_city = await db.City.create({
        //     sido: "서울",
        //     sgg: "서울",
        //     population: 9565990,
        //     latitude: "37.5665350",
        //     longitude: "126.9779692"
        // })


    } catch (error) {
        console.error('Unable to connect to the database:', error)
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

