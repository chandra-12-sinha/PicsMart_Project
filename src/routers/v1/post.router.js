const { getAllPOst } = require('../../controllers/post.controller')
const requireUser = require('../../moddlewere/requireUser')

const router = require('express').Router()

router.get('/all', requireUser, getAllPOst)

module.exports = router