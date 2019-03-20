const express = require("express");

const User = require("../models/user")

const router = express.Router();

router.post('/signup', (req, res, next) => {
    const user = new User({
        userName: req.body.userName,
        password: req.body.password
    })

    user.save().then(createdUser => {
        console.log(createdUser)
        res.status(201).json({
            message: "user is created successfully.",
            user: {
                ...createdUser, //all properties of createdPost
                id: createdUser._id,
            }
        });
    })
});

router.post('/login', (req, res, next) => {

    User.find().then(documents => {
        // console.log(documents)

        let result = documents.filter(user => user.userName === req.body.userName)
        if (result.length == 0) {
            return res.status(200).json({
                message: "You are not signed up!"
            });
        } else {
            return res.status(200).json({
                message: "You are logged in"
            });
        } 
        
    });
});

module.exports = router;