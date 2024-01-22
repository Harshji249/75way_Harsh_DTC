import express from 'express'
import {body} from 'express-validator'
const {
    createuser,
    login
} = require('../controllers/auth')

const router = express.Router();
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5})
], createuser)

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5})
], login)


module.exports = router;