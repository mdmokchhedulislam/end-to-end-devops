

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const blog = mongoose.model("blog",blogSchema)