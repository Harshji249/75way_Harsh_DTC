import {Schema,model,Document} from "mongoose"

export interface Child{
    name:string,
    email:string,
    password:string,
    reachedSchool : boolean,
    attendance: boolean,
    leftHome : boolean,
    role :string
}
export interface ChildDocument extends Child , Document{}

const childSchema : Schema<ChildDocument>  = new Schema({
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
    reachedSchool:{
        type:Boolean,
        default:false
    },
    attendance:{
        type:Boolean,
        default:false
    },
    leftHome:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"child"
    }
})
const child = model<ChildDocument>("Child", childSchema)
child.createIndexes
export default child