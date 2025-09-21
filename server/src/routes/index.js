const express = require("express")
const router = express.Router()
const BlogModel = require("../models/Blog.model")

// sare blog ko fetch karna hai 
router.get("/",async(req,res)=>{
    console.log("")
    const blogs = await BlogModel.find({})
    res.status(200).send(blogs)
})
// create a new blog [POST]
router.post("/create",async(req,res)=>{
    // title,desc,content

    if(!req.body){
        return res.json({
            error:"Please fill all required fields"
        })
        
    }

    const data = req.body

    if(!data?.title || !data?.desc || !data?.content){
        return  res.status(400).json({
            error:"All Fields Are Required"
        })
   

    }
    // data ko save karna hain mongodb me
    await BlogModel.create({
        title:data.title,
        desc:data.desc,
        content:data.content
    })
   return res.status(200).send({
    msg:"Blog Created :)"
   })

})


// delete a blog [delete]
router.delete("/delete/:id",async(req,res)=>{
    if(!req.params){
        return  res.status(400).json({
            error:"id is required"
        })
   

    }
    
    if(!req.params.id){
        return  res.status(400).json({
            error:"id is required"
        })
   

    }
    await BlogModel.findByIdAndDelete(req.params.id)
    res.send({msg:"Blog Deleted :)"})
})

router.get("/get/:id",async(req,res)=>{
    if(!req.params){
        return  res.status(400).json({
            error:"id is required"
        })
   

    }

    if(!req.params.id){
        return  res.status(400).json({
            error:"id is required"
        })
   

    }
   const blog= await BlogModel.findById(req.params.id)
   if(!blog){
    return  res.status(404).json({
        error:"blog not found"
    })
   }
    res.send(blog)
})



// update a blog [patch,put]



module.exports = router