

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const contact = mongoose.model("contact",contactSchema)