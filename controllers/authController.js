const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.SignUp = (req, res) =>{
    if(!req.body.email || !req.body.password){
        res.json({success:false, message:'Please, enter your credentials.'})
    } else{
        let newUser = new User({
            username:req.body.email,
            password:req.body.password
        })
        
        newUser.save(function(err){
            if(err){
                res.json({success:false, message:err})
            }
            res.json({success:true, message:'Account created succesfully.'})
        })
    }
}


exports.SignIn = (req, res)=>{
    User.findOne({username:req.body.email}, (err, user)=>{
        if(err){
            throw err
        }
        if(!user){
            res.json({success:false, message: 'Authentication failed. User not found.'})
        } else{
            user.comparePassword(req.body.password,(err, isMatch)=>{
                if(isMatch && !err){
                    let token = jwt.sign({id:user._id, username:user.username}, process.env.SECRET_TOKEN_KEY,{expiresIn:60})
                    res.json({success:true, token: 'Bearer ' + token, user:user})
                }
                else{
                    res.json({success:false, message:'Authentication failed. Password does not match'})
                }
            })
        }
    })
}