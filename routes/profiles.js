const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

// router.get('/create', Controller.getCreateProfile)
// router.post('/create', Controller.postCreateProfile)
router.get('/edit/:id', Controller.getEditProfile)
router.post('/edit/:id', Controller.postEditProfile)
router.post('/delete/:id', Controller.deleteProfile)
router.get('/:id', Controller.getProfile)

module.exports = router
