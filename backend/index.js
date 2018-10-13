'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = require('./router');

const PORT = 4000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin1234@ds259089.mlab.com:59089/userlist', {useNewUrlParser: true});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our home!', database: "You are using mongoDB!" });
});

app.listen(PORT, () => {
    console.log(`Express Server is running on port ${PORT}`);
});