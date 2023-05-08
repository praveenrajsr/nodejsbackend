const express = require('express');
const UserController = require('../views/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/user', UserController.index)
router.post('/user/register', UserController.UserRegister)
router.post('/user/login', UserController.LoginAuth)
router.get('/welcome', auth, UserController.welcome)

module.exports = router