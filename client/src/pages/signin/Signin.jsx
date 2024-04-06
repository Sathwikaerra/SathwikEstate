import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Signin() {

  const navigate=useNavigate();

  const [formData,setformData]=useState({})
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false)

  const handleChange=(e)=>{

    setformData({...formData,[e.target.id]:e.target.value})

  }


  const SubmitHandler=async(e)=>{
try {
  e.preventDefault();
    setLoading(true);
    const res=await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success==false){
      setError(data.message);
      setLoading(false)
        return;
    }
    setLoading(false)
    setError("success")
    navigate('/')
  
  
} catch (error) {
  setLoading(false)
  setError(error.message)
  
}

    


  }
  
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form  onSubmit={SubmitHandler}  className='flex flex-col gap-4 '>
        <input type="email" placeholder='email' className='border p-3 rounded-lg ' id='email'  onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
        <input type="submit" disabled={loading} className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' value={loading?"Loading":"Sign In"}/>

      </form>
      <div className='flex gap-2 mt-5'>
        <p> Don't have an Account?</p>
        <Link to={'/sign-out'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 '>{error}</p>}
    </div>
  )
}
