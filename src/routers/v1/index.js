const router = require('express').Router()
// const requireUser = require('../../moddlewere/requireUser')
const authRouter = require('./auth.router')
const postRouter = require('./post.router')

router.use('/auth',authRouter)
router.use('/post', postRouter)

module.exports = router