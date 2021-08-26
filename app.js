const express = require('express');
const bodyParser = require('body-parser');
// const { sequelize } = require('./models')
// db 관련
const db = require('./models');
const cors = require('cors');
const session = require('express-session')
// const passport = require('./auth')
var passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy;

class App {

    constructor () {

        this.app = express();

        this.dbConnection();

        this.setMiddleWare();

        // this.setPassport();
        // console.log("passport set")

        this.getRouting();

        // this.app.get('/auth2', (req, res) => {
        //     return res.send("auth2")
        // })

        this.app.get('/auth/google',
            passport.authenticate('google', { scope: ['profile'] }));

        this.app.get('/auth/google/callback', 
            passport.authenticate('google', { failureRedirect: '/login' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
        });

    }

    dbConnection() {
        // db.sequelize.sync({force: true})
        db.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .then(() => {
            // console.log('DB Sync complete.');
            // we're not syncing; instead we're authenticating and using sequelize migration
            // return db.sequelize.sync({force: true});
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    getRouting() {
        this.app.use(require('./controllers'));
    }

    setMiddleWare() {
        
        // 미들웨어 셋팅
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());

        this.app.use(session({
            saveUninitialized : true,
            resave : true,
            secret: process.env.SESSION_SECRET
        }));

        this.setPassport();

    }

    setPassport() {
        // var passport = require('passport')
        var GoogleStrategy = require('passport-google-oauth20').Strategy;

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log("profile: ", profile)
            return cb(null, profile)
        }
        ));

        passport.serializeUser(function(user, cb) {
            cb(null, user)
        })
        
        passport.deserializeUser(function(user, cb) {
            cb(null, user)
        })

        console.log("passport set")

    }
        
}

module.exports = new App().app;