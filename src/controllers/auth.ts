import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {validationResult} from 'express-validator'
import Teacher from '../models/Teacher'


const JWT_SECRET = process.env.JWT_SECRET || "secretjwtstring"

const createuser = async(req:express.Request, res:express.Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        let checkUser = await Teacher.findOne({email:req.body.email})
        if(checkUser) return res.status(400).json({error: "User with this email already exists"})
        const salt = await bcrypt.genSalt(10);
    const{name,email,password}= req.body;
    const secPass = await bcrypt.hash(password,salt)
    let teacher= new Teacher({name, email,password:secPass});
    teacher = await teacher.save()
    const data = {
        teacher:{
            id:teacher.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error");
    }
}

const login = async(req:express.Request, res:express.Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    try{
        let user = await Teacher.findOne({email:req.body.email})
        if(!user) return res.status(400).json({error: "User with this email dosen't exists"})
const passwordCompare = await bcrypt.compare(password,user.password);
if(!passwordCompare) return res.status(400).json({error:"Loggin with correct credentials"})
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken,user});
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error");
    }
}

module.exports ={
    createuser,
    login
}