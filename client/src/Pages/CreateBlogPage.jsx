import axios from 'axios'
import React, { useState } from 'react'
import Editor from '../components/Editor'

const CreateBlogPage = () => {
  const [states, setStates] = useState({
    title: '',
    desc: '',
    content: ''
  })

  const [error, setError] = useState({
    isShow: false,
    msg: ""
  })
  const [msg, setMsg] = useState({
    isShow: false,
    msg: ""
  })

  const onChangeHandler = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/api`,states)
      const data = response.data

      // Reset error state
      setError({ isShow: false, msg: "" })

      // Show success
      setMsg({ isShow: true, msg: data.message })

      // Clear form
      setStates({ title: '', desc: '', content: '' })
    } catch (error) {
      console.error(error)

      setMsg({ isShow: false, msg: "" })
      setError({
        isShow: true,
        msg: error.response?.data?.message || error.message
      })
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="card col-sm-10 mx-auto py-4 mt-5 px-3">
      <div className="mb-3">
        <h1>Post New Blog</h1>
      </div>

      {error.isShow && (
        <div className="mb-3 alert alert-danger">{error.msg}</div>
      )}
      {msg.isShow && (
        <div className="mb-3 alert alert-success">{msg.msg}</div>
      )}

      <div className="mb-3">
        <label htmlFor="title">Title</label>
        <input
          onChange={onChangeHandler}
          value={states.title}
          type="text"
          name="title"
          id="title"
          className="form-control"
          placeholder="Enter Blog Title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="desc">Description</label>
        <textarea
          onChange={onChangeHandler}
          value={states.desc}
          rows={5}
          name="desc"
          id="desc"
          className="form-control"
          placeholder="Enter Blog Description"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="content">Content</label>
        <Editor
          data={states.content}
          setFun={(val) => setStates({ ...states, content: val })}
        />
      </div>

      <div className="mb-3">
        <button style={{ width: "100%" }} className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  )
}

export default CreateBlogPage
