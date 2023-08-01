const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a user by their id
router.get('/:userId', userController.getUserById);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update an existing user
router.put('/:userId', userController.updateUser);

// Route to delete a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;
