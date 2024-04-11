import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../listingitem/listingitem'
import {Swiper ,SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import  'swiper/css/bundle'
import './style.css'




export default function Home() {
const[offerListings,setOfferListings]=useState([])
const[saleListings,setsaleListings]=useState([])
const[rentListings,setrentListings]=useState([])



SwiperCore.use([Navigation])

const [offerimages,setofferImages]=useState([])




useEffect(()=>{

  const fetchofferlistings=async()=>{
    try {
      
       const res=await fetch(`/api/listing/get?offer=true&limit=4`);
       const data=await res.json()

        setOfferListings(data)
    

        
        fetchrentlistings();


    } catch (error) {
      console.log(error)
      
    }

  }


  
  const fetchrentlistings=async()=>{
    try {
      
       const res=await fetch(`/api/listing/get?type=rent&limit=4`);
       const data=await res.json()

        setrentListings(data)
        fetchsalelistings();


    } catch (error) {
      console.log(error)
      
    }
  }
    
  const fetchsalelistings=async()=>{
    try {
      
       const res=await fetch(`/api/listing/get?type=sale&limit=4`);
       const data=await res.json()

        setsaleListings(data)
        


    } catch (error) {
      console.log(error)
      
    }
  }

  fetchofferlistings();


 




},[])






  return (
    <div className='home flex flex-col'>
      {/* //top */}

      <div className=" title flex flex-col gap-6 pt-14 pb-2  sm:p-28  px-3 max-w-6xl  mx-auto">
        <h1 className='text-blue-900 font-bold text-3xl lg:text-6xl'>
        The legal right to own a <span className='text-black'>land</span>   <span className='text-slate-500 ml-2'>or</span>
          <br /><span className='text-black'>property</span> 
        </h1>
        <div className="text-black text-xs sm:text-lg">
          sathwik Estate is the best place to  find your next perfect place  to live.
          <br />
          we have a wide range of properties for you to choose from.

        </div>
        <Link className='text-xs bg-violet-400  p-2 w-[130px] sm:text-sm text-black font-bold hover:underline ' to={'/search'}>
          Let's get started...

        </Link>
      
      </div>

      {/* //slide */}
      
      <div className=''>

      <Swiper  className='' navigation>
        {
          offerListings && offerListings.length>0 && offerListings.map((i,index)=>(
            
              <SwiperSlide>
              <div className=" slider h-[500px]" style={{background:`url(${i.imageUrls[0]}) center no-repeat`, backgroundSize:'contain'}} key={index} ></div>
            </SwiperSlide>

            

           
          ))
        }



        </Swiper>
        </div>


      {/* //listings for  offer sales and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length >0 && (
            <div className="">
              <div className='my-3'>
                <h2 className='text-black text-center font-semibold text-2xl'>Recent Offers</h2>
               <h1 className='text-center'> <Link className='text-sm text-blue-800 font-semibold text-center  hover:underline ' to={'/search?offer=true'}>Show more offers</Link></h1>

              </div>
              <div className=" grid gap-4 grid-cols-3 sm:flex sm:flex-wrap sm:gap-4 sm:justify-center  sm:items-center  ">
                { 
                  offerListings.map((i)=><ListingItem key={i._id} listing={i}/>)
                }

              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length >0 && (
            <div className="">
              <div className='my-3'>
                <h2 className='text-black  text-center font-semibold text-2xl'>Recent places for rent</h2>
                <h1 className='text-center'> <Link className='text-sm text-blue-800 font-semibold hover:underline ' to={'/search?type=rent'}>Show more places for rent</Link></h1>

              </div>
              <div className="grid gap-4 grid-cols-3 sm:flex sm:flex-wrap sm:gap-4 sm:justify-center  sm:items-center ">
                { 
                  rentListings.map((i)=><ListingItem key={i._id} listing={i}/>)
                }

              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length >0 && (
            <div className="">
              <div className='my-3'>
                <h2 className='text-black text-center font-semibold text-2xl'>Recent places for sale</h2>
               <h1 className='text-center'> <Link className='text-sm text-blue-800 font-semibold hover:underline ' to={'/search?type=sale'}>Show more places for sale</Link>
               </h1>
              </div>
              <div className="grid gap-4 grid-cols-3 sm:flex sm:flex-wrap sm:gap-4 sm:justify-center  sm:items-center ">
                { 
                  saleListings.map((i)=><ListingItem key={i._id} listing={i}/>)
                }

              </div>
            </div>
          )
        }



      </div>
    </div>
  )
}
