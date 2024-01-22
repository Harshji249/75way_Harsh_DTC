import {Schema,model,Document} from "mongoose"

export interface Parent{
    child:any,
    name : string,
    email:string,
    password:string,
    role: string
}
export interface ParentDocument extends Parent , Document{}
const parentSchema : Schema<ParentDocument> = new Schema({
    child:{
        type: Schema.Types.ObjectId,
        ref :'child'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required : true
    },
    role:{
        type:String,
        default:"parent"
    }
})

const parent = model<ParentDocument>("Parent", parentSchema)
parent.createIndexes
export default parent;