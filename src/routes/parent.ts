import express from 'express'
const {
    gethomework,
    lefthome
}= require ('../controllers/parent')
const fetchchild = require('../middleware/fetchchild')
const router = express.Router();

router.get('/gethw', gethomework)
router.put('/lefthome', fetchchild,lefthome)


module.exports = router