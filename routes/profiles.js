const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.post('/', Controller.createProfile)
router.get('/:id', Controller.getProfile)
router.post('/:id/edit', Controller.editProfile)
router.post('/:id/delete', Controller.deleteProfile)

module.exports = router