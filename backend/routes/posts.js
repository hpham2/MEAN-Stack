const express = require("express");

const Post = require('../models/post');

const router = express.Router();

/**Just use for post req */
router.post('',(req,res, next) => {
  const post = new Post({
    title:  req.body.title,
    content:  req.body.content
  })
  post.save().then(createdPost => {
    res.status(201).json({
      message: "post added successfully.",
      postId: createdPost._id
    });
  });
});

/**Just use for get req */
router.get('',(req, res, next) => {
  Post.find().then(documents => {
    // console.log(documents)
    return res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
})

/**update post */
router.put("/:id", (req, res, next) => {
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
