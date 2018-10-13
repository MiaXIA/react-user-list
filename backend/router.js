'use strict';
const express = require('express');
const router = express.Router();

const User = require('./user');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our api!', database: 'You are using mongoDB!' });
});

//C
router.post('/users/insertone', (req, res) => {
    var user = new User();
    user.id = req.body.id;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.age = req.body.age;
    user.sex = req.body.sex;
    user.save( err => {
        if(err) res.send(err);
        res.json({ message: `New user: ${req.body.name} created!` });
    });
});

//R
router.get('/users/getall', (req, res) => {
    User.find(function(err, users) {
        if(err) res.send(err);
        res.json(users);
    });
});

router.get('/users/getone/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) res.send(err);
        res.json(user);
    });
});

//U
router.put('/users/updateone/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) res.send(err);
        user.id = req.body.id;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.age = req.body.age;
        user.sex = req.body.sex;
        user.save(err => {
            if(err) res.send(err);
            res.json({ message: 'The user updated!' });
        });
    });
});

//D
router.delete('/users/deleteone/:id', (req, res) => {
    User.deleteOne({
        _id: req.params.id
    }, (err, user) => {
        if(err) res.send(err);
        res.json({ message: 'Successfully deleted!' });
    });
});

module.exports = router;