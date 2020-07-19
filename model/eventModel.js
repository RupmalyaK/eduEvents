import mongoose from "mongoose";


const Schema = mongoose.Schema;

const eventSchema = new Schema({
    teacherId:{type:String,maxLength:32,required:true},
    displayName:{type:String,maxLength:32,required:true},
    title:{type:String,maxLength:32,required:true},
    date:{type:Date,required:true},
    task:{type:String,default:0, maxLength:256,required:true,} , 
    time:{type:String,maxLength:6,min:1,required:true},   
},{timestamps:{createdAt:true,updatedAt:true}});


export default mongoose.model("event", eventSchema);