import express from 'express'
import Child from '../models/Child'
import Homework  from '../models/HomeWork'
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretjwtstring"

const login = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await Child.findOne({ email: email })
        if (!user) return res.status(400).json({ error: "User with this email dosen't exists" })
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(400).json({ error: "Loggin with correct credentials" })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken, user });
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal server error");
    }
}

const gethomework = async(req: express.Request, res: express.Response)=>{
    try{
        const homework = await Homework.find()
        res.send({status:200, homework});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server error occured")
    }
}

module.exports = {
    login,
    gethomework
}