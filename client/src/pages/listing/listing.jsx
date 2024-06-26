import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Swiper ,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import {useSelector} from 'react-redux'
import Contact from '../../components/Contact';
import '../Home/style.css'


export default function listing() {

  const {currentUser}=useSelector(state=>state.user)
  

  SwiperCore.use([Navigation]);
  
  const params=useParams()
  const [listData,setListData]=useState([]);
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState(false)
  const [images,setImages]=useState([])
  const [contact,setContact]=useState(false)

  const [Rs,setRs]=useState(0);
  
  





useEffect(()=>{



  const fetchId=async()=>{

    try {
      setLoading(true)
      const res=await fetch(`/api/listing/get/${params.id}`);
    const data=await res.json();
   
    if(data.success===false)
    {
      setError(true)
      setLoading(false);
      return;
    }
    setListData(data);
   
    setRs(data.regularPrice);
    setImages(data.imageUrls)
   
setLoading(false)
    
      
    } catch (error) {
      setError(true)
      setLoading(false)
      
    }

    




  }
  fetchId();
},[params.id])












  return (
    <main className='listing'>
      {loading && <p  className='text-center my-7 text-2xl'>loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>something went wrong!</p>}

     <Swiper className='pt-5' navigation>
      {
        images.map((url)=>(
          <SwiperSlide key={url}>
            
            <div className="h-[550px]" style={{background:`url('${url}') center no-repeat  ` ,backgroundSize:'contain' }}>


            </div>

          </SwiperSlide>

        )
          
        )
      }

     </Swiper>

<div className=" flex  flex-wrap justify-center flex-col">
<div className='flex  gap-4 flex-wrap flex-col flex-1 mx-auto  mt-10'>
      <div className='flex justify-center text-xs sm:text-2xl items-center gap-0 sm:gap-4'>
      <p className='text-3xl font-semibold'>{listData.name}</p>
      for
      <p className='p-1 sm:p-2 text-sm  bg-red-700 max-w-[200px] text-center rounded-md text-white' >{listData.type}</p>
      
      </div>
      <div className='flex gap-3 items-center  justify-center'>
      <p className='text-3xl text-slate-700 font-semibold'>$ {Rs.toLocaleString()}</p>
      <p className='font-semibold'>Discount:</p>
      <p className='p-2 bg-green-700 max-w-[200px] text-center rounded-md text-white'>${listData.discountPrice}% OFF</p>


      </div>
     

      
     </div>
     <div className="flex flex-wrap flex-1 gap-2 justify-center  font-semibold  my-4 mx-auto">
     Location:
     <i className="fa-solid  fa-location-dot text-blue-700 text-xl"></i>
     <span className='text-slate-700 font-normal text-md '>{listData.address}</span>

     </div>

     
    
    

<div className=" flex flex-wrap text-xl mb-2 items-center justify-center ">
  <span className='text-2xl  bg-blue-500 p-2 font-semibold text-black'>Description</span>
  <p>{listData.description}</p>
  
</div>

<div className=" p-3 flex   flex-wrap justify-center gap-10 font-bold text-green-700  text-sm">
  <p className='flex items-center gap-1 whitespace-nowrap'><i class="fa-solid fa-bed"></i>{listData.bedrooms>1 ?` ${listData.bedrooms} beds`:`${listData.bedrooms} bed`}</p>
  <p className='flex items-center gap-1 whitespace-nowrap'><i class="fa-solid fa-bath"></i>{listData.bathrooms>1 ?` ${listData.bathrooms} baths`:`${listData.bathrooms} bath`}</p>

<p className='flex items-center gap-1 whitespace-nowrap'>
<i className="fa-solid fa-square-parking"></i>{listData.parking?"Parking":"No Parking"}
</p>

<p className='flex items-center gap-1 whitespace-nowrap'>
<i className="fa-solid fa-couch"></i>{listData.furnished?"Furnished":"Unfurnished"}
</p>
  

</div>
<div className='flex flex-1 mt-4 justify-center items-center  '>
  {

    currentUser&& !contact && currentUser._id!==listData.useRef ?(<button hidden={contact} onClick={()=>setContact(true)} className='rounded-lg  w-[200px] sm:w-[500px]  bg-slate-700 text-white p-3 uppercase hover:opacity-90'>Contact owner</button>):' '

  }
  {
    contact && <Contact listData={listData}/>
  }

</div>




</div>

     


      
    </main>
  )
  
}
