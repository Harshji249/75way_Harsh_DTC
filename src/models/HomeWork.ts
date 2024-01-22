import {Schema,model,Document} from "mongoose"

export interface Homework{
    ques:string,
    date: any
}
export interface HomeworkDocument extends Homework , Document{}

const homeworkSchema : Schema<HomeworkDocument>  = new Schema({
    ques:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
})
const homework = model<HomeworkDocument>("Homework", homeworkSchema)
homework.createIndexes
export default homework