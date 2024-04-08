import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useRef} from 'react'
import {getDownloadURL, getStorage,ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../../firebase'
import {updateUserStart,updateUserSuccess,logoutUserFailure,logoutUserSuccess,logoutUserStart,updateUserFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../../redux/userSlice'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

export default function Profile() {
  const dispatch=useDispatch()
  const fileRef=useRef(null);
  const [file,setFile]=useState(undefined)
  const [filePercent,setFilePercent]=useState(0);
  const[fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({})
  const [updatesuccess,setUpdateSuccess]=useState(false)





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

    </div>
  )
}
