const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/home', Controller.getHome)
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.getLogIn)
router.post('/login', Controller.postLogIn)
router.get('/logout', Controller.logOut)

module.exports = router