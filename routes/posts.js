const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.getCreatePost)
router.post('/', Controller.postCreatePost)
router.get('/edit/:id', Controller.getEditPost)
router.post('/edit/:id', Controller.postEditPost)
router.post('/delete/:id', Controller.deletePost)

module.exports = router