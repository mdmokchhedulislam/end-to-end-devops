import React from 'react'; 
import MDEditor from '@uiw/react-md-editor';

const Editor = ({data,setFun}) => {
  return (
    <>

<div className="">
      <MDEditor
      height={300}
        value={data}
        onChange={setFun}
      />
      {/* <MDEditor.Markdown source={data} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </div>
  </>
  )
}

export default Editor