import mongoose from "mongoose";
import {randomUUID} from 'crypto'
const chatSchema = new mongoose.Schema(
    {
        id:{
            type:String,
            default: randomUUID()
        },
        role:{
            type: String,
            required: true
        },
        content:{
            type:String,
            required:true,
        }
    },{timestamps:true})

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name is required"]
        },
        email:{
            type:String,
            required: [true, "Email is required"],
            unique: true
        },
        password:{
            type:String,
            required: [true, "Password is required"]
        },
        Chat:[chatSchema]
    },
    {timestamps:true})

const User = mongoose.model('User', userSchema)

export default User;