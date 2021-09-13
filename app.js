const express = require('express');
const bodyParser = require('body-parser');
// const { sequelize } = require('./models')
// db 관련
const db = require('./models');
const axios = require('axios')
const cors = require('cors');
const session = require('express-session')
// const passport = require('./auth')
var passport = require('passport')
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const url = require('url');
const db_url = process.env.PRODUCTION_BACKEND_URL
const client_url = process.env.PRODUCTION_FRONTEND_URL
// const LocalStrategy = require('passport-local').Strategy;



class App {

    constructor () {

        console.log("clientID: ", process.env.GOOGLE_CLIENT_ID)

        this.app = express();

        this.dbConnection();

        this.setMiddleWare();

        // this.setPassport();
        // console.log("passport set")

        this.getRouting();

        this.app.get('/auth/google',
            passport.authenticate('google', { scope: ['profile', 'email'] })
        )


        this.app.get('/auth/google/callback', 
            passport.authenticate('google', { failureRedirect: client_url + '/go' }),
            function(req, res) {
                var sessionUserID = req.session.passport.user
                console.log("session user: ", req.session.passport.user)
                // res.send(sessionUserID)
                // window.sessionStorage.setItem('id', sessionUserID)
                
                res.redirect(url.format({
                    pathname: client_url + '/loading',
                    query: {
                        "userId": sessionUserID
                    }
                }))
                
        });

        this.app.get('/auth/facebook',
            passport.authenticate('facebook', { scope: ['public_profile', 'email']})
        );

        this.app.get('/auth/facebook/callback', 
            passport.authenticate('facebook', { failureRedirect: client_url + '/go' }), 

            function(req, res) {
                var sessionUserID = req.session.passport.user

                res.redirect(url.format({
                    pathname: client_url + '/loading',
                    query: {
                        "userId": sessionUserID
                    }
                }))

            }

        );

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
        // this.app.options('*', cors());

        console.log("env secret: ", process.env.SESSION_SECRET )

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
            callbackURL: db_url + "/auth/google/callback",
            passReqToCallback: true,
            session: true
        },
        async function(req, accessToken, refreshToken, profile, email, done) {
            console.log("accessToken: ", accessToken)
            console.log("profile: ", profile)
            console.log("email: ", email)
            console.log("firstname: ", email.name.givenName)
            console.log("email: ", email.emails[0].value)
            console.log("photo: ", email.photos[0].value)

            // console.log("request middleware: ", req)
        
            try {
                const user = await axios.post(db_url + '/user/login', {
                    email : email.emails[0].value,
                    nickname: email.name.givenName,
                    profile_image: email.photos[0].value,
                    dateofbirth: ""
                })
                console.log("app.js user: ", user.data)
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        }
        ));

        var FacebookStrategy = require('passport-facebook').Strategy

        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: db_url + "/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'email', 'birthday', 'first_name', 'photos'],
            passReqToCallback: true,
            session: true
          },
          async function(accessToken, refreshToken, public_profile, email, done) {
            
            try {
                var userInfo = email._json
                console.log("email: ", userInfo.email)
                console.log("first name: ", userInfo.first_name)
                console.log("profile image: ", email.photos[0].value)
                const user = await axios.post(db_url + '/user/login', {
                    email : userInfo.email,
                    nickname: userInfo.first_name,
                    profile_image: email.photos[0].value,
                    dateofbirth: ""
                })
                // console.log("app.js user: ", user.data)
                return done(null, user)
            } catch (err) {
                return done(err)
            }

          }
        ));


        // var TwitterStrategy = require('passport-twitter').Strategy;

        // passport.use(new TwitterStrategy({
        //     consumerKey: TWITTER_CONSUMER_KEY,
        //     consumerSecret: TWITTER_CONSUMER_SECRET,
        //     callbackURL: db_url + "auth/facebook/callback",
        //     passReqToCallback: true,
        //     session: true
        //   },
        //   async function(accessToken, refreshToken, profile, email, done) {
            
        //     try {
        //         console.log("profile: ", profile)
        //         console.log("email: ", email)
        //         const user = 1
        //         // const user = await axios.post(db_url + '/user/login', {
        //         //     email : email.emails[0].value,
        //         //     nickname: email.name.givenName,
        //         //     profile_image: email.photos[0].value,
        //         //     dateofbirth: ""
        //         // })
        //         // console.log("app.js user: ", user.data)
        //         return done(null, user)
        //     } catch (err) {
        //         return done(err)
        //     }

        //   }
        // ));


        passport.serializeUser(function(user, done) {
            console.log("serialize user")
            done(null, user.data.id)
        })
        
        passport.deserializeUser(async function(id, done) {
            console.log("deserialize user")
            try {
                var user = await db.User.findByPk(id)
                done(null, user)
            } catch (err) {
                done(err)
            }
        })

        console.log("passport set")

    }
        
}

module.exports = new App().app;