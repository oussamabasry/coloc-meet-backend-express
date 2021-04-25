const express = require('express')

const app = express()
const cors = require('cors')
const Route =require('./Routes/Post')
const mongoose = require('mongoose')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
app.use(allowCrossDomain);
 app.use(cors())

app.use('/',Route)


const PORT =8000;
app.listen( PORT,() => console.log(`server is running in port ${PORT}`))


mongoose.connect('',{useUnifiedTopology: true,useNewUrlParser: true } )
        .then(()=> console.log("connected to db"))
        .catch((err) => console.error('not connected to db'))