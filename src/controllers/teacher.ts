import express from 'express'
import Parent from '../models/Parent'
import Child from '../models/Child'
import Homework from '../models/HomeWork'
import nodeMailer from 'nodemailer'
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET || "secretjwtstring"

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




const createuser = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let checkUser = await Child.findOne({ email: req.body.email })
        if (checkUser) return res.status(400).json({ error: "Child with this email already exists" })
        const salt = await bcrypt.genSalt(10);
        const { name, email, password } = req.body;
        const secPass = await bcrypt.hash(password, salt)
        let child = new Child({ name, email, password: secPass });
        child = await child.save()
        const data = {
            child: {
                id: child.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal server error");
    }
}

const markattendance = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.body;
        await Child.findByIdAndUpdate({ _id: id }, { $set: { "attendance": true } })
            .then(async () => {
                res.status(200).send("Attendance Updated Successfully")
                sendMail(transporter, mailOptions);
                await Child.findByIdAndUpdate({ _id: id }, { $set: { "leftHome": false } })
            }).catch((err: any) => {
                console.log(err)
            })
        console.log(id)
    }
    catch (err) {
        console.log(err)
    }
}

const createhomework = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    try {
        const { ques } = req.body;
        let homework = new Homework({ ques })
        await homework.save()
            .then(() => {
                return res.status(200).send("Homework added successfully")
            }).catch((err: any) => {
                console.log(err)
            })
        const data = {
            homework: {
                id: homework.id
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const createparent = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { name, email, password, child_email } = req.body
        let checkUser = await Parent.findOne({ email: req.body.email })
        if (checkUser) return res.status(400).json({ error: "Parent with this email already exists" })
        let findChild : any= await Child.findOne({ email: child_email });
        let childId = findChild._id;
        if (!findChild) return res.status(400).json({ error: "No child exists with this email" })
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)

        let parent = new Parent({
            name, email, password: secPass, child: childId
        })
        parent = await parent.save()
        const data = {
            parent: {
                id: parent.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    createuser,
    markattendance,
    createhomework,
    createparent
}