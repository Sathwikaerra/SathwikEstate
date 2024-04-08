import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Swiper ,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'


export default function listing() {

  SwiperCore.use([Navigation]);
  
  const params=useParams()
  const [listData,setListData]=useState([]);
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState(false)
  const [images,setImages]=useState([])





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
    setImages(data.imageUrls)
   
setLoading(false)
    
      
    } catch (error) {
      setError(true)
      setLoading(false)
      
    }

    




  }
  fetchId();
},[])


console.log(images)




  return (
    <main>
      {loading && <p  className='text-center my-7 text-2xl'>loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>something went wrong!</p>}

     <Swiper navigation>
      {
        images.map((url)=>(
          <SwiperSlide key={url}>
            <div className="h-[550px]" style={{background:`url(${url}) center no-repeat  ` ,backgroundSize:'contain'}}>


            </div>

          </SwiperSlide>

        )
          
        )
      }

     </Swiper>

      
    </main>
  )
  
}
