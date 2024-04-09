import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listData}) {
    const [landlord,setLandlord]=useState(null);
    const[error,setError]=useState(false)
    const [message,setMessage]=useState('')


useEffect(()=>{

    const fetchLandLord=async()=>{
        try {
            const res=await fetch(`/api/user/${listData.useRef}`);
            const data=await res.json();
            setLandlord(data);
            
            
        } catch (error) {
            setError(true)
            
        }
    }
    fetchLandLord();

},[listData.useRef])

const Onchane=(e)=>{

    setMessage(e.target.value)


}








  return (
    <>
    {
        landlord && (<div className=' flex flex-col gap-2'>
            <p>Contact <span className='font-semibold '>{landlord.username}</span> for <span className='font-semibold '>{listData.name.toLowerCase()}</span></p>
            <textarea className='w-full border border-gray-300 rounded-md p-2 mt-2' placeholder='enter your message here...' name="messsgae" id="message"  rows="3" onChange={Onchane} value={message}/>


            <Link className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90' to={`mailto:${landlord.email}?subject=regarding${listData.name}&body=${message}`}>Send Message</Link>

        </div>)
    }
    
    
    </>
  )
}
