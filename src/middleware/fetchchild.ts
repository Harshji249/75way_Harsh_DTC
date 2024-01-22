import express from 'express'
import { Response } from "express"
const Child = require('../models/Child')
import { IGetUserAuthInfoRequest } from "./definitionfile"
const jwt = require('jsonwebtoken')
const JWT_SECRET = "secretjwtstring"

const fetchchild = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send("Please authenticate using valid token")
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user.id;
        console.log(req.user)
        let checkUser = await Child.findOne({ _id: req.user })
        if (checkUser) res.status(401).send("You are not allowed")

        next()
    }
    catch (err) {
        console.log(err)
    }
}

module.exports= fetchchild;