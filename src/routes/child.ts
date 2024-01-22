import express from 'express'
import {body} from 'express-validator'
const {
    login,
    gethomework
} = require('../controllers/child')


const router = express.Router();
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
],login)

router.get('/gethw', gethomework)


module.exports = router