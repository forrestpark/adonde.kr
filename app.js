const express = require('express');
const bodyParser = require('body-parser');
// const { sequelize } = require('./models')
// db 관련
const db = require('./models');

class App {

    constructor () {

        this.app = express();

        this.dbConnection();

        this.setMiddleWare();

        this.getRouting();

    }

    dbConnection() {
        db.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .then(() => {
            console.log('DB Sync complete.');
            // we're not syncing; instead we're authenticating and using sequelize migration
            // return db.sequelize.sync({force: true});
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    getRouting (){
        this.app.use(require('./controllers'));
    }

    setMiddleWare (){
        
        // 미들웨어 셋팅
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }
        
}

module.exports = new App().app;