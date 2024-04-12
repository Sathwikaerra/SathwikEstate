import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import '../../pages/Home/style.css'


export default function Header() {


    
    const navigate=useNavigate()
    const {currentUser}=useSelector(state=>state.user)
  const [searchTerm,setSearchTerm]=useState('')

 
    
const  handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);

    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`)



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
   <header className='header  shadow-md'>
    <div className='flex items-center justify-between p-3 gap-4 mx-auto max-w-6xl'>
    <h1 className='text-sm sm:text-xl  font-bold flex flex-wrap'>
        <span className='text-white '>sathwik</span>
        <span className='text-amber-600'>Estate</span>
    </h1>
    <form  onSubmit={handleSubmit} className='bg-slate-100 rounded-lg p-2 flex gap-4 items-center'>
        <input  value={searchTerm}onChange={(e)=>setSearchTerm(e.target.value)}  type="text" placeholder='search...' className='bg-transparent focus:outline-none text-orange-950 text-xs sm:text-xm w-11 sm:w-[390px] ' />
       
       
       <button className='text-s'>        <FaSearch className='text-slate-600 ' />
</button>
       
    </form>

    <ul className='flex justify-center items-center gap-3  sm:gap-8'>
        <Link to='/'>
        <li className='text-xs sm:inline sm:text-xl border border-yellow-400 rounded-lg p-1  text-white hover:bg-white hover:text-black'>Home</li>
       </Link>
       <Link to='/about'>
        
        <li className='text-xs sm:inline sm:text-xl border border-yellow-400 rounded-lg p-1  text-white hover:bg-white hidden sm:visible hover:text-black'>About</li>
        </Link>

       <Link to='/profile'>
        {
            currentUser?( <img className='h-8 w-8 object-cover rounded-full' src={currentUser.avatar} alt="profile" /> ):(<li className='text-xs sm:inline sm:text-xl border border-yellow-400 rounded-lg p-1  text-white hover:bg-white hover:text-black'>Sign In</li>)
        }
        </Link>
    </ul>
    </div>
   
   </header>
  )
}
