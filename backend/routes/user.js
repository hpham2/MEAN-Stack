const express = require("express");

const User = require("../models/user")

const router = express.Router();

router.post('/signup', (req, res, next) => {
    const user = new User({
        userName: req.body.userName,
        password: req.body.password
    })

    // console.log(req.body)

    User.find().then(documents => {
        let result = documents.filter(user => user.userName === req.body.userName);

        if (result.length == 0) {
            user.save().then(createdUser => {
                return res.status(201).json({
                    message: "Your account is created successfully.",
                    user: {
                        ...createdUser, //all properties of createdPost
                        id: createdUser._id,
                    }
                });
            })
        } else {
            return res.status(200).json({
                message: "This email is already used!"
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    User.find().then(documents => {
        let result = documents.filter(user => user.userName === req.body.userName)
        if (result.length == 0) {
            return res.status(200).json({
                message: "You are not signed up!"
            });
        } else {
            if (result[0].password === req.body.password) {
                return res.status(200).json({
                    message: "You are logged in"
                });
            }
            return res.status(200).json({
                message: "Your password is wrong."
            });
        }
    });
});

module.exports = router;