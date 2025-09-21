import axios from 'axios'
import React, { useState } from 'react'
import Editor from '../components/Editor'

const CreateBlogPage = () => {

    const [states,setStates] = useState({
        title: '',
        desc: '',
        content: ''
    })

    const [error,setError]=  useState({
        isShow:false,
        msg:""
    })
    const [msg,setmsg]=  useState({
        isShow:false,
        msg:""
    })

    const onChageHandler =(e)=>{
        setStates({...states,[e.target.name]:e.target.value})
    }

    const onSubmitHandler =async(e)=>{
        e.preventDefault()
        try {
            

            const response = await axios.post(import.meta.env.VITE_BACKEND_URI+"/create",states)
            const data = await response.data
            setError({
                isShow:false,
                msg:''
            })
            setmsg({
                isShow:true,
                msg:data.msg
            })
            setStates({
                title:'',
                desc:'',
                content:''
            })

        } catch (error) {
            console.error(error)
            setmsg({
                isShow:false,
                msg:""
            })
            setError({
                isShow:true,
                msg:error.response.data.error || error.message
            })
        }
    }

  return (
    <>
    
                <form onSubmit={onSubmitHandler} className='card col-sm-10 mx-auto py-4 mt-5 px-3'>
                    <div className="mb-3">
                        <h1>Post New Blog</h1>
                    </div>

                        {error.isShow &&<div className="mb-3 alert alert-danger">
                                {error.msg}
                        </div>}
                        {msg.isShow &&<div className="mb-3 alert alert-success">
                                {msg.msg}
                        </div>}

                    <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input onChange={onChageHandler} value={states.title} type="text"  name='title' id='title' className="form-control" placeholder='Enter Blog Title' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc">Description</label>
                        <textarea onChange={onChageHandler} value={states.desc}  rows={5} name='desc'  id='desc' className="form-control" placeholder='Enter Blog Description' />
                    </div>
                    {/* <div className="mb-3">
                        
                        <textarea onChange={onChageHandler} value={states.content}  rows={10} name='content' id='content' className="form-control" placeholder='Enter Blog Content' />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="content">Content</label>
                        <Editor data={states.content} setFun={(val)=>setStates({...states,content:val})} />
                        </div>
                    <div className="mb-3">
                        <button style={{width:"100%"}}  className="btn btn-primary">Add</button>
                    </div>
                </form>
    </>
  )
}

export default CreateBlogPage