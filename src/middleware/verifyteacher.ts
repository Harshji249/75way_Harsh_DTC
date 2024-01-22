
import { Response } from "express"
import Teacher from "../models/Teacher"
import { IGetUserAuthInfoRequest } from "./definitionfile"
import jwt from 'jsonwebtoken'
const JWT_SECRET = "secretjwtstring"

const verifyteacher = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send("Please authenticate using valid token")
    }
    try {
        const data: any = jwt.verify(token, JWT_SECRET);
        req.user = data.teacher.id;
        console.log(data)
        let checkUser : any = await Teacher.findOne({ _id: req.user })
        console.log("checkUser",checkUser)
        if (checkUser) next()
        else{
            return res.status(401).send("You are not allowed")
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = verifyteacher;