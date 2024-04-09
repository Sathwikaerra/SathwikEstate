import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {


    
    const navigate=useNavigate()
    const {currentUser}=useSelector(state=>state.user)
  const [searchTerm,setSearchTerm]=useState('')
    
const  handleSubmit=(e)=>{
    console.log(searchTerm)
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);

    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search/${searchQuery}`)



}

useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);

    const searchTermformUrl=urlParams.get('searchTerm');

    if(searchTermformUrl)
    {
        setSearchTerm(searchTermformUrl);
    }

},[location.search])

  return (
   <header className='bg-slate-200 shadow-md'>
    <div className='flex items-center justify-between p-3 mx-auto max-w-6xl'>
    <h1 className='text-sm sm:text-xl font-bold flex flex-wrap'>
        <span className='text-slate-500 '>sathwik</span>
        <span className='text-slate-700'>Estate</span>
    </h1>
    <form  onSubmit={handleSubmit} className='bg-slate-100 rounded-lg p-2 flex items-center'>
        <input  value={ searchTerm}onChange={(e)=>setSearchTerm(e.target.value)}  type="text" placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-64 ' />
       
       
       <button>        <FaSearch className='text-slate-600' />
</button>
       
    </form>

    <ul className='flex gap-4'>
        <Link to='/'>
        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
       </Link>
       <Link to='/about'>
        
        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
        </Link>

       <Link to='/profile'>
        {
            currentUser?( <img className='h-8 w-8 object-cover rounded-full' src={currentUser.avatar} alt="profile" /> ):(<li className='hidden sm:inline text-slate-700 hover:underline'>Sign In</li>)
        }
        </Link>
    </ul>
    </div>
   
   </header>
  )
}
