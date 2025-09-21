import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
const HomePage = () => {
    const [data,setData] =React.useState([])
    const[refetch,setRefetch] = React.useState(false)

    const fetchAllBlogs =async()=>{
        try{
            const response = await axios.get(import.meta.env.VITE_BACKEND_URI+"/")
            const data = await response.data
            setData(data)
        }
        catch(e){
            console.log(e.message)
        }
    }
    React.useEffect(()=>{
        fetchAllBlogs()
    },[refetch])


  return (
    <>
                {
                    data &&data?.length>0 && data?.map((cur,i)=>{
                        return <BlogCard refetch={()=>setRefetch(!refetch)} data={cur} key={i} />
                    })
                }
    </>
  )
}

export default HomePage

const BlogCard = ({data,refetch})=>{

    const deleteFun =async()=>{
        const response = await axios.delete(import.meta.env.VITE_BACKEND_URI+"/delete/"+data._id)
        const res =await response?.data
        console.log(res)
        refetch()
    }


    return (
        <>
        <div className="col-sm-6 mx-auto card my-1">
            <div className="card-header">
                <h5>{data?.title}</h5>
            </div>
            <div className="card-body">
                <p>{data?.desc}</p>
            </div>
            <div className="card-footer"> 
                <button onClick={deleteFun} className='btn btn-danger btn-sm'>Delete</button>
                <Link to={"/blog/"+data._id} className="btn btn-primary mx-2 btn-sm">View</Link>
            </div>
        </div>
        </>
    )
}