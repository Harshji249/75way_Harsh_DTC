import express from 'express'
const {
    createuser,
    markattendance,
    createhomework,
    createparent
} = require('../controllers/teacher')
import nodeMailer from 'nodemailer'
const verifyTeacher = require('../middleware/verifyteacher')
import { body } from'express-validator'
const router = express.Router();


const JWT_SECRET = "secretjwtstring"

let transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "hs2622411@gmail.com",
        pass: "ytwp xdrx kgfw qijs"
    },
})

const mailOptions = {
    from: {
        name: "Harsh Sharma",
        address: "hs2622411@gmail.com"
    },
    to: "harshsharma220092@gmail.com",
    subject: "SEND MAIL FROM NODE MAILER",
    text: "SENT MAIL"
}

const sendMail = async (transporter: any, mailOptions: any) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("SUCCESSFULL")
    } catch (err) {
        console.log(err);
    }
}

router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], verifyTeacher, createuser)



router.put('/markattendance', verifyTeacher, markattendance)

router.post('/createhw', [
    body('ques', 'Enter a valid Question').isLength({ min: 5 })
], verifyTeacher, createhomework)


router.post('/createparent', [
    body('name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], verifyTeacher, createparent)


module.exports = router