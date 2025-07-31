const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.post('/', Controller.createPost)
router.post('/:id/edit', Controller.editPost)
router.post('/:id/delete', Controller.deletePost)

module.exports = router