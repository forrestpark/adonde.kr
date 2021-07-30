const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const path = require("path");
const fs = require("fs");

const Op = db.Sequelize.Op;

;(async function main() {
    try {
        
        await sync_db();
        console.log('DB Sync complete.');

        // need to load city data first due to foreign key constraints
        await load_city_data();
        // after mounting city data, mount the rest
        await mount_data();

    } catch (error) {
        console.error('Database mounting unsuccessful:', error)
    }
})()

async function sync_db() {
    await db.sequelize.sync({force: true});
}

async function read_train_csv(filePath) {

    var filePath = path.join(__dirname, filePath);

    console.log(filePath)
    
    var data = fs.readFileSync(filePath, {encoding: "utf8"});
    var rows = data.split("\n");
    var result = [];
        
    for (var rowIndex in rows) {
        // console.log(rows[rowIndex])
        var city_destinations = rows[rowIndex].split("\"");
        var comma_split = rows[rowIndex].split(",")

        if (rowIndex == rows.length - 1) {
            continue;
        }

        if (rowIndex != "0") {
            var city = city_destinations[0]
            var destinations = city_destinations[1]

            var sido = city.split(",").slice(0,1).toString();
            var sgg = city.split(",").slice(1,2).toString();
            var sido_sgg = comma_split.slice(comma_split.length-1, comma_split.length).toString();

            combination_list = destinations.toString().slice(1, destinations.length-1).split(",")
            var destination_list = []
            var destination_sido = ""
            var destination_sgg = ""

            for (var i = 0; i < combination_list.length / 2; i++) {
                destination_sido = eval(combination_list[i*2]).replace(/\s+/g, '')
                destination_sgg = eval(combination_list[i*2+1]).replace(/\s+/g, '')
                destination_list.push([destination_sido, destination_sgg])
            }

            row = [sido, sgg, destination_list, sido_sgg]
        }

        if (rowIndex === "0") { var columns = rows[0].split(","); console.log(columns); } 

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
    const city_data = await read_csv("data/city/city_combined.csv");

    // pushing city data into city table in database
    for (var i = 0; i < city_data.length - 1; i++) {
        console.log(city_data[i])
        await db.City.create({
            sido: city_data[i]['sido'],
            sgg: city_data[i]['sgg'],
            population: city_data[i]['population'],
            latitude: city_data[i]['lat'],
            longitude: city_data[i]['long'],
            sido_sgg: city_data[i]['sido_sgg']
        })
    }

}

async function load_express_data() {

    // reading express bus terminal data from a local csv file in data folder
    const express_data = await read_csv("data/express/express_combined.csv");

    // pushing express bus terminal data into express table in database
    for (var i = 0; i < express_data.length - 1; i++) {
        // console.log(express_data[i])
        await db.Express.create({
            ...express_data[i]
        })
    }
    
    // manually adding express bus terminal entries
    const manual_express_data = [
        {
            "id": "NAEK010",
            "name": "서울경부",
            "sido": "서울",
            "sgg": "서울",
            "sido_sgg": "서울 서울",
        },
        {
            "id": "NAEK801",
            "name": "동대구",
            "sido": "대구",
            "sgg": "대구",
            "sido_sgg": "대구 대구",
        },
        {
            "id": "NAEK396",
            "name": "안면도",
            "sido": "충청남도",
            "sgg": "태안",
            "sido_sgg": "충청남도 태안",
        },
        {
            "id": "NAEK500",
            "name": "광주(유·스퀘어)",
            "sido": "광주",
            "sgg": "광주",
            "sido_sgg": "광주 광주",
        },
        {
            "id": "NAEK580",
            "name": "장흥",
            "sido": "전라남도",
            "sgg": "장흥",
            "sido_sgg": "전라남도 장흥",
        },
    ];

    for (var i = 0; i < manual_express_data.length; i++) {
        await db.Express.create({
            ...manual_express_data[i]
        })
    }
}

async function load_suburbs_data() {

    // reading suburban bus terminal data from a local csv file in data folder
    const suburbs_data = await read_csv("data/suburbs/suburbs_active.csv");
        
    // pushing suburban bus terminal data into suburbs table in database
    for (var i = 0; i < suburbs_data.length - 1; i++) {
        // console.log(suburbs_data[i])
        await db.Suburbs.create({
            ...suburbs_data[i]
        })
    }
}

async function load_train_data() {
    
    // reading train data from a local csv file in data folder
    const train_data = await read_train_csv("data/train/train_combined.csv");

    for (var i = 0; i < train_data.length - 1; i++) {
        await db.Train.create({
            ...train_data[i]
        })
    }

}

async function mount_data() {
    await load_train_data();
    await load_express_data();
    await load_suburbs_data();
}


