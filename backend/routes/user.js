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
    const user = new User({
        userName: req.body.userName,
        password: req.body.password
    })

    console.log(user)

    // user.save().then(createdUser => {
    //     console.log(createdUser)
    //     res.status(201).json({
    //         message: "user is created successfully.",
    //         user: {
    //             ...createdUser, //all properties of createdPost
    //             id: createdUser._id,
    //         }
    //     });
    // })
});

module.exports = router;