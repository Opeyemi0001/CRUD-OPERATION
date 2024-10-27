const express = require ('express');
const Post = require('../models/Post');
const router = express.Router();

// fetch all post endpoint
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({success: true, data: posts});
  } catch (err) {
    res.json({ message: err});
  }
});

// create new post endpoint
router.post('/create-post', async (req, res) => {
  // destructure the request body
  const {title, content, category, tags, postImg } = req.body;
  // create a new post
  try {
    const post = new Post ({
      title,
      postImg,
      body: content,
      category,
      tags,
    });
    const savedPost = await post.save();
    res.status(201).json({success: true, data: savedPost});
  } catch (error) {
    res.json ({message: error});
  }
});


// fetch single post endpoint
router.get('/post/:postId', async (req, res) => {
  // extract postId
  const { postId } = req.params;
  // fetch single post
  try {
    const post = await Post.findById(postId);

    if(!post) {
      return res.status(404).json({success: false, message:'Post not found'});
    }
    res.status(200).json({success: true, data: post});
  } catch (error) {
    res.json({ message: error });
  }
});

// update post endpoint
router.patch('/update-post/:postId', async (req, res) => {
  // extract postId
  const { postId } = req.params;
  // destructure the request body
  const {title, content, category, tags, postImg } = req.body;
  // update post
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      title,
      postImg,
      body: content,
      category,
      tags,
    }, {new: true});

    if (!updatedPost) {
      return res.status(404).json({success: false, message: 'Post not found'});
    }
    res.status(200).json({success: true, data: updatedPost});
  } catch (error) {
    res.json({ message: error });
  }
});

// delete post endpoint
router.delete('/delete-post/:postId', async (req, res) => {
  // extract postId
  const { postId } = req.params;
  // delete
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({success: false, message: 'Post not found'});
    }
    res.status(200).json({success: true, message: 'Post deleted successfully'});
  } catch (error) {
    res.json({message: error});
  }
});



// filter post by categery endpoint
router.get('posts/category/:category', async (req, res) => {
  // extract category
  const { category } = req.params;
  // filter post by category
  try {
    const posts = await Post.find({ category });

    if(!posts) {
      return res.status(404).json({success: false, message: 'Post not found'});
    }

    res.status(200).json({success: true, data: posts});
  } catch (error) {
    res.json({ message: error });
  }
});

// endpoint for sending mail
router.post('/sendMail', async (req, res) => {
  // destructure the request body
  const {firstName, phoneNumber, email, subject} = req.body;
  // create a new email
  const messageData = `
  fullName: ${firstName},
  phoneNumber: ${phoneNumber},
  email: ${email},
  subject: ${subject}
  `

  // nodemailer for sending mail

  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: '',
    }
  });

  const mailOption = {
    from: '',
    to: '',
    subject: `${subject}`,
    text: `${messageData}`,
  };

  mail.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent' + info.response);
    }
  });
});

// export the router to use if in the main server
module.exports = router;