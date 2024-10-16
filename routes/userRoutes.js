const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

// fetch all user endpoint
router.get('/users', async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).json({success: true, data: users});
  } catch (error) {
    res.json({message: error});
  }
});


// create new user endpoint
router.post('/create-user', async (req, res) => {
  // destructure the request body
  const { firstName, lastName, email, phoneNumber } = req.body;
  // create new user
  try {
    const user = new User ({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    const savedUser = await user.save();
    res.status(201).json({success: true, data: savedUser});
  } catch (error) {
    res.json({message: error});
  }
});


// fetch single user endpoint
router.get('/user/:userId', async (req, res) => {
  // extract userId
  const { userId } = req.params;
  // fetch single user
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({success: false, message: 'user not found'});
    }
    res.status(200).json({success: true, data: user});
  } catch (error) {
    res.json({message: error});
  }
});


// update user endpoint
router.patch('/update-user/:userId', async (req, res) => {
  // extract userId
  const { userId } = req.params;
  // destructure the request body
  const { firstName, lastName, email, phoneNumber } = req.body;
  // update user
  try {
    const updatedUser = await Post.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      phoneNumber,
    }, { new: true });

    if(!updatedUser) {
      return res.status(404).json({success: false, message: 'user not found'});
    }
    res.status(200).json({success: true, data: updatedUser});
  } catch(error) {
    res.json({ message: error });
  }
});


// delete user endpoint
router.delete('/delete-user/:userId', async (req, res) => {
  // extract userId
  const { userId } = req.params;
  // delete user
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({success: false, message: 'User not found'});
    }
    res.status(200).json({success: true, message: 'User deleted successfuly'});
  } catch (error) {
    res.json({message: error});
  }
});

module.exports = router;