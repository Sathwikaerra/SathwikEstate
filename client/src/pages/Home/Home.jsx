import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../listingitem/listingitem'
import {Swiper ,SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import  'swiper/css/bundle'




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
    <div>
      {/* //top */}

      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>Perfect</span>
          <br />place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          sathwik Estate is the best place to  find your next perfect place  to live.
          <br />
          we have a wide range of properties for you to choose from.

        </div>
        <Link className='text-xs sm:text-sm text-blue-800 font-bold hover:underline ' to={'/search'}>
          Let's get started...

        </Link>
      
      </div>

      {/* //slide */}

      <Swiper navigation>
        {
          offerListings && offerListings.length>0 && offerListings.map((i,index)=>(
            
              <SwiperSlide>
              <div className="h-[500px]" style={{background:`url(${i.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}} key={index} ></div>
            </SwiperSlide>

            

           
          ))
        }



        </Swiper>


      {/* //listings for  offer sales and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length >0 && (
            <div className="">
              <div className='my-3'>
                <h2 className='text-slate-600 font-semibold text-2xl'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'/search?offer=true'}>Show more offers</Link>

              </div>
              <div className="flex flex-wrap gap-4 ">
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
                <h2 className='text-slate-600 font-semibold text-2xl'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'/search?type=rent'}>Show more places for rent</Link>

              </div>
              <div className="flex flex-wrap gap-4 ">
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
                <h2 className='text-slate-600 font-semibold text-2xl'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'/search?type=sale'}>Show more places for sale</Link>

              </div>
              <div className="flex flex-wrap gap-4 ">
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
