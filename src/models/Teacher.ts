import {Schema,model,Document} from "mongoose"
export interface Teacher{
    name : string,
    email:string,
    password:string,
    role: string
}
export interface TeacherDocument extends Teacher , Document{}

const teacherSchema : Schema<TeacherDocument>= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required:true
    },
    role:{
    type:String,
    default:"teacher"
    }
})
const teacher = model<TeacherDocument>("Teacher", teacherSchema)
teacher.createIndexes
export default teacher;