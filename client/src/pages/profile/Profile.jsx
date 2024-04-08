import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useRef} from 'react'
import {getDownloadURL, getStorage,ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../../firebase'
import {updateUserStart,updateUserSuccess,logoutUserFailure,logoutUserSuccess,logoutUserStart,updateUserFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../../redux/userSlice'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { space } from 'postcss/lib/list'

export default function Profile() {
  const dispatch=useDispatch()
  const fileRef=useRef(null);
  const [file,setFile]=useState(undefined)
  const [filePercent,setFilePercent]=useState(0);
  const[fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({})
  const [updatesuccess,setUpdateSuccess]=useState(false)
const[showListingError,setShowListingsErrors]=useState(false)
const [Showloading,setShowLoading]=useState(false)
const [userListings,setuserListings]=useState([])

const [deleteError,setDeleteError]=useState(false);
const [delteSuccesss,setDeleteSuccess]=useState(false)




  const {currentUser,loading,error}=useSelector(state=>state.user)


  useEffect(()=>{
    if(file)
    {
      handleFileUpload(file);
    }

  },[file])

  const handleFileUpload=(file)=>{
    const storage=getStorage(app);

    const  fileName=new Date().getTime() + file.name;
    const stoargeRef=ref(storage,fileName);

    const uploadTask=uploadBytesResumable(stoargeRef,file);
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred /
       snapshot.totalBytes )*100;
      setFilePercent(Math.round(progress))
    },
  
  (error=>{
    setFileUploadError(true)
  }),
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
      setFormData({...formData,avatar:downloadUrl})
  })
},
    )
  }

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {

      dispatch(updateUserStart())
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData)
      });
      const data=await res.json();
      if(data.success=== false)
      {
         dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)

      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
      console.log(error)
    }
  }

  const handleDelete=async()=>{
  
try {
  dispatch(deleteUserStart())
  const res=await fetch(`/api/user/delete/${currentUser._id}`,{
    method:"DELETE",

  })
  const data=await res.json();
  setuserListings(data);
  if(data.success===false)
  {
    dispatch(deleteUserFailure(data.message))
    return
  }
  dispatch(deleteUserSuccess(''))
  console.log(currentUser)

  
} catch (error) {
  dispatch(deleteUserFailure(error.message))
  
}
  }

  const handlelogout=async()=>{
    try {


      dispatch(logoutUserStart());
      const res=await fetch('/api/auth/signout');
      const data=await res.json()
      if(data.success==false)
      {
        dispatch(logoutUserFailure(data.message))

        return;
      }
      dispatch(logoutUserSuccess(''));
      
    } catch (error) {
      dispatch(logoutUserFailure(data.message))
    }
  }

  const handleShowListings=async(e)=>{
    
    try {
      setShowLoading(true)

      const res=await fetch(`/api/user/listings/${currentUser._id}`);
      const data =await res.json();

      if(data.success===false)
      {
        setShowListingsErrors(true);
        setShowLoading(false)
      }


      setShowLoading(false)
      setuserListings(data)
      
    } catch (error) {
      setShowListingsErrors(true)
      setShowLoading(false)
    }

  }

  const handleListingdelete=async(listingId)=>{
    try {
      const res=await fetch(`/api/listing/delete/${listingId}`,{
        method:"DELETE",
      })
      const data=await res.json();


      if(data.success===false)
      {
        setDeleteError(true)
        return
      }
      setuserListings((prev)=>prev.filter((listing)=>listing._id!==listingId))
      setDeleteSuccess(true)
    } catch (error) {
      setDeleteError(true)
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
    <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
      <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile'  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
     <p className='text-sm self-center'>
      {
        fileUploadError? <span className='text-red-700'>Error in Image Upload</span>:
       filePercent>0 && filePercent<100 ?<span className='text-slate-700'>{`Uploading ${filePercent}%`}</span>:
        filePercent ===100 ?<span className='text-green-700'>Successfully Uploaded</span>:""

      }
      </p>
      <input  onChange={handleChange} type="text" placeholder='username' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg ' />
      <input onChange={handleChange} type="email" placeholder='email' id='email' defaultValue={currentUser.email} className='border p-3 rounded-lg ' />
      <input  onChange={handleChange}type="text" placeholder='password' id='password' className='border p-3 rounded-lg ' />
      <button  disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>{loading? "loading" :'Update'}</button>
    <Link className='bg-green-700 uppercase text-white rounded-lg hover:opacity-90 text-center p-3' to={'/create-listing'}>Create Listing</Link>
    </form>

<div className="flex justify-between mt-5">
  <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
  <span onClick={handlelogout} className='text-red-700 cursor-pointer'>Sign out</span>
</div>


<p className='text-red-700 my-3 text-center'>{error? error:""}</p>
<p className='text-green-700 my-3 text-center'>{updatesuccess? "Updated succesfully":""}</p>
<button onClick={handleShowListings} className='text-green-700 w-full '>{Showloading?"Loading...":"Show Listings"}</button>
   <p className='mt-5 text-red-700'>{showListingError?"Error Showing Lists":""}</p>
   {
    userListings &&
     userListings.length>0 &&
     <div className="flex flex-col gap-4 mt-7">
      <h1 className='text-2xl font-semibold my-7 text-center'>Your Listings</h1>


{userListings.map((listing)=>{
      return <div key={listing._id} className="border rounded-lg p-3  gap-4 flex justify-between items-center">
      <Link to={`/listing/${listing._id}`} >
        <img className='w-16 h-16 m-2 object-contain' src={listing.imageUrls[0]} alt='listing cover' />


      </Link>
      
      <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`} >
        
        <p >{listing.name}</p>


      </Link>
      <div className="flex flex-col items-center gap-2">
        <button onClick={()=>handleListingdelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
        
         <span className='text-red-700'> {deleteError?"Error in deleting ":""} </span>
         <span className='text-green-700'> {delteSuccesss?"Succesfully deleted ":""} </span>
        
        <button className='text-green-700 uppercase'>Edit</button>
      </div>

      </div>
    }) }


     </div>}
   
   
    </div>
  )
}
