import React, { useState } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../../firebase'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import '../Home/style.css'


export default function createListing() {
  const navigate=useNavigate();
  const {currentUser}=useSelector(state=>state.user)
  const [files,setFiles]=useState([])
  const[fileUploadError,setFileUploadError]=useState(false)
  const [filePercent,setFilePercent]=useState(0);

    const [formData,setFormData]=useState({
    imageUrls:[],
    name:"",
    description:"",
    address:'',
    type:"rent",
    bedrooms:'1',
    bathrooms:'1',
    regularPrice:0,
    discountPrice:0,
    parking:false,
    furnished:false,

  })


  const [imageUploadError,setImageUplaodError]=useState(false)
  const [uploading,setUploading]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
const [success,setSuccess]=useState(false);
 


  const handleImageSubmit=(e)=>{
    setUploading(true)

    if(files.length>0 && files.length + formData.imageUrls.length <7)
    {
      const promises=[];

      for(let i=0;i<files.length;i++)
      {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises).then((urls)=>{
        setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})

        setImageUplaodError(false)
        setUploading(false)
       

      }).catch((error)=>{
        setImageUplaodError('image upload failed (2mb per image)')
        setUploading(false)

      })
    }
    else{
      setImageUplaodError(" you can upload only 6 images for listing")
      setUploading(false)
    }

  }

  const storeImage=async(file)=>{

    return new Promise((resolve,reject)=>{
      const  stoarge=getStorage(app);
      const filename=new Date().getTime()+ file.name;
      const storageRef=ref(stoarge,filename);
      const uploadTask=uploadBytesResumable(storageRef,file);

      uploadTask.on("state_changed",
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilePercent(Math.round(progress));
      },
     (error)=>{
      setFileUploadError('error in image uploading')
     },
     ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          resolve(downloadUrl)
      })
     }
    )


    })

  }

const handleImageDelete=(index)=>{
  setFormData({...formData,imageUrls:formData.imageUrls.filter((url,i)=>

      i!==index
  ),})

}


const handleChange=(e)=>{

  if(e.target.id==='sale' || e.target.id==='rent')
  {
    setFormData({...formData,type:e.target.id})
  }
  if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer')
  {
    setFormData({...formData,[e.target.id]:e.target.checked})
  }
  if(e.target.type==='text' || e.target.type==='textarea' || e.target.type==='number')
  {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

}

const handleSubmit=async(e)=>{
e.preventDefault();
try {
  if(formData.imageUrls.length<1) return setError("you must upload atleast one image")
  
  setLoading(true);
  setError(false);

  const res= await fetch('/api/listing/create',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      ...formData,useRef:currentUser._id,
    })
  });

  const data=await res.json()
setLoading(false);
setSuccess("List Created Succesfully")

  if(data.success===false)
  {
    setError(data.message)
    setSuccess(false)
  }
  navigate(`/listing/${data._id}`)



  
} catch (error) {
  setLoading(false)
  setError(error.message)
  setSuccess(false)
}
}


  return (
    <div className='createmain p-3 '>

    
    <main className='createlist pt-5 rounded-lg p-3 max-w-4xl mx-auto'>
     <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form onSubmit={handleSubmit} className="flex flex-col  sm:flex-row gap-4">

      <div className='flex flex-col gap-4 flex-1'>
      <input onChange={handleChange} type="text" placeholder='name' className='border p-3 rounded-lg ' id='name' value={formData.name} maxLength='62' minLength='3' required/>
      <textarea onChange={handleChange}  value={formData.description} type="text" placeholder='description' className='border p-3 rounded-lg ' id='description'  required/>
      <input type="text" onChange={handleChange} value={formData.address} placeholder='address' className='border p-3 rounded-lg ' id='address'  required/>

      <div className="flex gap-6 flex-wrap">
        <div className=" flex gap-2">
          <input type="checkbox"  onChange={handleChange} checked={formData.type==='sale'} id="sale" className='w-5' />
          <span>Sell</span>
        </div>
        <div className=" flex gap-2">
          <input type="checkbox"  onChange={handleChange} checked={formData.type==='rent'} id="rent" className='w-5' />
          <span>Rent</span>
        </div>
        <div className=" flex gap-2">
          <input type="checkbox"  onChange={handleChange} checked={formData.parking} id="parking" className='w-5' />
          <span>Parking spot</span>
        </div>
        <div className=" flex gap-2">
          <input type="checkbox" onChange={handleChange} checked={formData.furnished}  id="furnished" className='w-5' />
          <span>Furnished</span>
        </div >
        <div className=" flex gap-2">
          <input type="checkbox" onChange={handleChange} checked={formData.offer}  id="offer" className='w-5' />
          <span>offer</span>
        </div>
        
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input className='p-3 border w-14 sm:w-24 border-gray-300 rounded-lg ' type="number"  onChange={handleChange} value={formData.bedrooms} id="bedrooms" minLength='1' maxLength='10' required />
          <span>Beds</span>
        </div>
        <div className="flex items-center gap-2">
          <input className='p-3 border w-14 sm:w-24 border-gray-300 rounded-lg ' type="number"  id="bathrooms" onChange={handleChange} value={formData.bathrooms} minLength='1' maxLength='10' required />
          <span>Baths</span>
        </div>
        <div className="flex items-center gap-2">
          <input className='p-3 border w-14 sm:w-24 border-gray-300 rounded-lg ' type="number"  id="regularPrice" onChange={handleChange} value={formData.regularPrice} minLength='100' maxLength='10000000' required />
          <div className="flex flex-col  items-center">
          <span>Regular price</span>
          <span className='text-xs'>($ / month)</span>

          </div>
          
        </div>
        <div className="flex items-center gap-2">
          <input className='p-3 border w-14 sm:w-24  border-gray-300 rounded-lg ' type="number"  id="discountPrice" onChange={handleChange} value={formData.discountPrice} minLength='50' maxLength='10000000' required />
          <div className="flex flex-col items-center">
          <span>Discount price</span>
          <span className='text-xs'>($ / month)</span>

          </div>
          </div>
        
       
      </div>

      </div>
     
     <div className="flex flex-col flex-1 gap-4" >

      <p className='font-semibold '>Images:
      <span className='font-normal text-gray-600 ml-2'>the first image will be the cover (max 6)</span>
      </p>

      <div className=' flex gap-4'>
        <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-black rounded w-full ' type="file"  id="images"  accept='image/*' multiple/>
        <button onClick={handleImageSubmit} type='button' className='p-3 text-white hover:bg-blue-950 bg-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >
          {uploading ?`${filePercent}% uploaded`:"Uplaod"



        }</button>

          
        
      </div>
      {
            fileUploadError? <span className='text-red-700'>Error in Image Upload</span>:
           filePercent>0 && filePercent<100 ?<span className='text-slate-700'>{`Uploading${filePercent}%`}</span>:
            filePercent ===100 ?<span className='text-green-700'>Successfully Uploaded</span>:""
    
          }

      <p className='text-red-700 text-center'>{imageUploadError && imageUploadError}</p>
      {
        formData.imageUrls.length >0 && formData.imageUrls.map((url,i)=>{

          return <div key={i} className=" flex justify-between  shadow-2xl bg-yellow-500 rounded-lg p-3 border items-center ">
            <img src={url} alt="listing image" className='w-30 h-20 rounded-lg object-contain'/>
            <button type='button' onClick={()=>handleImageDelete(i)} className='p-3 bg-red-700 rounded-lg uppercase hover:opacity-90'>Delete</button>
          </div>
           
        })
      }
      <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80' >{loading?"Creating...":"Create a Listing"}</button>
      {error? <p className='text-red-700 text-sm text-center'>{error}</p>:""}
      {success?<p className='text-green-700 text-sm text-center'>{success}</p>:""}
     </div>


     


           
    </form>
    
    </main>
    </div>
  )
}
