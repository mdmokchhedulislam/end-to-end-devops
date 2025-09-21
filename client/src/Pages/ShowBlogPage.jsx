import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {   useParams } from 'react-router'
import MarkdowmIt from 'markdown-it'
const ShowBlogPage = () => {

  const {id} = useParams()
  const [loading,setLoading] = useState(true)
  const [blog,setBlog] = useState({})

  const md = MarkdowmIt()
  const fetchBlog =async(id)=>{
    try {
      
      const response =await axios.get(import.meta.env.VITE_BACKEND_URI+"/get/"+id)
      const data = await response.data
      setBlog(data)
    } catch (error) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
   if(id){
    fetchBlog(id)
   }
  },[id])


  if(loading){
    return <div>loading...</div>
  }
  return (
    <>

    <div className="container card col-sm-10 mx-auto py-5" >
        <div className="mb-3 card-header">
         <h1> {blog.title}</h1>
         </div>
         <div className="mb-3 card-body">

         <article dangerouslySetInnerHTML={{__html:md.render(blog.content)}}></article>

        </div>
    </div>
    </>
  )
}

export default ShowBlogPage