import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type:String,maxLength:32,required:true},
    displayName:{type:String,maxLength:20,required:true},
    password:{type:String,maxLength:32,required:true},
    role:{type:String,maxLength:7,required:true},
},({createdAt:true , updatedAt:true}));

export default mongoose.model("user", userSchema);