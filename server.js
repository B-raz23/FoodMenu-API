const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-Parser')
const dbConfig = require('./config/dbConfig')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const app = express()
const options = {
    origin: 'http://localhost:4000'
}

app.use(cors(options))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === "bearer"){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.Secret_Key, (err, data) => {
            if(err) req.user = undefined

            req.user = data
            next()
        })
    } 
    else{
        req.user = undefined
        next()
    }
})

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.dbUrl, {
    useNewUrlParser: true
})
.then(() => {
    console.log("Successful Connection to Database.")
    
})
.catch((err) => {
    console.log("Can't Connect to Database!!", err)
    process.exit()
})

app.get("/", (req, res) => {
    res.send("Welcome to Food Menu Items CRUD API !!")
})

require('./src/routes/itemRoute')(app)

let serverPort = app.listen(process.env.Port, () => {
    console.log("Server is running on port:", serverPort.address().port)
})