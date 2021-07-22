const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

;(async function main() {
    try {

        const dummy_city = await db.City.create({
            sido: "서울",
            sgg: "서울",
            population: 9565990,
            latitude: "37.5665350",
            longitude: "126.9779692"
        })


    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})()