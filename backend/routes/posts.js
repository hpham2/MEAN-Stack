const express = require("express");
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images") //this is relative to server.js file.
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, name + '-' + Date.now() + '.jpg');
  }
}) 

/**Just use for post req */
router.post('', multer({storage: storage}).single('image') ,(req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title:  req.body.title,
    content:  req.body.content,
    imagePath: url + "/images/" + req.file.filename
  })
  post.save().then(createdPost => {
    res.status(201).json({
      message: "post added successfully.",
      post: {
        ...createdPost, //all properties of createdPost
        id: createdPost._id,
      }
    });
  });
});

/**Just use for get req */
router.get('',(req, res, next) => {
  // console.log(req)
  Post.find().then(documents => {
    // console.log(documents)
    return res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
})

/**update post */
router.put("/:id", multer({storage: storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

/**Just use for delete req. Notice ":id" */
router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Post deleted"});
    });
})

module.exports = router;
