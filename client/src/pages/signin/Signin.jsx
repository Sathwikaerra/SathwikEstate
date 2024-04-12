import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice'
import Oauth from '../../components/Header/Oauth';
import '../Home/style.css'

export default function Signin() {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading,error}=useSelector((state)=>state.user)


  const [formData,setformData]=useState({})

  const handleChange=(e)=>{

    setformData({...formData,[e.target.id]:e.target.value})

  }


  const SubmitHandler=async(e)=>{
try {
  e.preventDefault();
  dispatch(signInStart())
    const res=await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success==false){
      dispatch(signInFailure(data.message))
      
        return;
    }
    dispatch(signInSuccess(data))
    navigate('/')
  
  
} catch (error) {
  dispatch(signInFailure(error.message))
  
}

    


  }
  
  
  return (
    <div className='signin sm:pt-8 flex justify-center items-center  sm:block '>

   
    <div className=' loginform outline-none border-black shadow-2xl p-10 sm:p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form  onSubmit={SubmitHandler}  className='flex flex-col gap-4 '>
        <input type="email" placeholder='email' className='border p-3 rounded-lg ' id='email'  onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
        <input type="submit" disabled={loading} className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' value={loading?"Loading":"Sign In"}/>
        <Oauth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Don't have an Account?</p>
        <Link to={'/sign-out'}>
          <span className='text-black font-semibold hover:text-blue-700 '>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 '>{error}</p>}
    </div>
    </div>
  )
}
