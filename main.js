//Standart imports
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const moment = require('moment')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./config/db')
const app = express()
const User = require('./models/userModel')


//Middlewares initialization
app.set(db)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


//Passport configuration
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_TOKEN_KEY
passport.use(new JWTStrategy(opts, (jwt_payload, done)=>{
    console.log(jwt_payload)
    User.findOne({_id:jwt_payload.id}, (err, user)=>{
        if(err){
            return done(err, false)
        }
        if(user){
             done(null, user)
        } else{
             done(null, false)
        }
    })
}))

let auth = require('./routes/authRoutes')
app.use(auth)


//Server initializer
const PORT = (process.env.PORT || 3000)
app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}. At: ${moment().format('LT')}`)
})
