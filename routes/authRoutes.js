const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../controllers/authController')


//Authentication routes
router.post('/register', auth.SignUp)

router.post('/login', auth.SignIn)

router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
  res.json({message:'worked', user:req.user})
});

// Set url for API group routes


module.exports = router