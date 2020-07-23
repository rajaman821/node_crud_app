const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
// router.post('/password', userController.postUpdatePassword);
// router.post('/deleteUser', userController.deleteById);
// router.get('/:_id', userController.getById);
module.exports = router;