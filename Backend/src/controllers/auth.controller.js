const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res){

    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                username
            }, 
            {
                email
            }
        ]
    });

    if(user){
        return res.status(409).json(user.email == email ? "email already exist" : "username already exist");
    }

    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const user = await userModel.create({
                username,
                email,
                password: hash
            })

            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, {expiresIn: "1h"})

            res.cookie("token", token);

            res.status(201).json({
                message: "user created successfully",
                user:{
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
        });
    });
}

async function loginUser(req, res){
    const {username, email, password} = req.body;
    const user = await userModel.findOne({
        $or:[
            {
                username
            },
            {
                email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "username/email is wrong"
        })
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if(err){
            console.log(err.message);
        }
        if(!result){
            return res.status(404).json({
                message: "password is wrong"
            })
        }
        if(result){
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, {expiresIn: "1d"})

            res.cookie("token", token);

            res.status(200).json({
                message: "login successfull",
                user:{
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
        }
    });
}

module.exports = {registerUser, loginUser}