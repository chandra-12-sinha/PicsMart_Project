const { signupController } = require('../../controllers/auth.contoller')

const router = require('express').Router()

router.post('/signup', signupController)

module.exports = router