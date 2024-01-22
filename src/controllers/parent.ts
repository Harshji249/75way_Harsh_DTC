import express from 'express'
import schedule from 'node-schedule'
import Child from '../models/Child'
import Homework  from '../models/HomeWork'



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

const lefthome = async (req: express.Request, res: express.Response) => {
    try{
        const {id } = req.body;
        await Child.findByIdAndUpdate({_id:id},{$set:{"leftHome": true}})
        .then (async()=>{
            schedule.scheduleJob('*/30 * * * * *',async () => {
                const child = await Child.find({"leftHome": true, "attendance": false});
                if(child){
                    child.forEach(async(child:any)=>{
                        console.log(`Child ${child._id} didnt reacged school on time`)
                    })
                }
            })
            res.status(200).send("Updated Successfully")
        }).catch((err: any)=>{
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    gethomework,
    lefthome
}