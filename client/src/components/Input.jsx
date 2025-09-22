import React from 'react';

function Input({ type, name, placeholder, handleChange, value }) {
  return (
    <>
      <div className=''>
        <input
          type={type}  
          name={name}  
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          className='placeholder:text-white w-full bg-transparent outline-none border border-white py-1 px-4 rounded-full'
        />
      </div>
    </>
  );
}

export default Input;
