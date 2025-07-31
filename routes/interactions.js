const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.post('/:postId/upvote', Controller.upvotePost)
router.post('/:postId/downvote', Controller.downvotePost)
router.post('/:postId/comment', Controller.commentPost)

module.exports = router