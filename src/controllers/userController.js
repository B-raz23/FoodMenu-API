const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/userModel')

exports.checkUser = (req, res, next) => {
    if(req.user){
        next()
    }
    else{
        res.status(401).send("Unauthorized User!!")
    }
}

exports.registerUser = (req, res) => {
    const user = new User(req.body)
    user.hashPassword = bcrypt.hashSync(req.body.password, 10)
    user.save((err, data) => {
        if(err){
            res.status(400).send(err)
        }
        else{
            data.hashPassword = undefined
            return res.json(data)
        }
    })
}

exports.loginUser = (req, res) => {
    User.findOne({email: req.body.email}, (err, data) => {
        if(err) throw err

        if(!data){
            res.status(404).send("User Not Found!!")
        }
        else if(data){
            if(!data.comparePassword(req.body.password, data.hashPassword)){
                res.status(401).send("Wrong Password!!")
            }
            else{ 
                res.json({token: jwt.sign({
                    email: data.email,
                    username: data.username,
                    _id: data.id}, process.env.Secret_Key
                )})
            }
        }
    })
}