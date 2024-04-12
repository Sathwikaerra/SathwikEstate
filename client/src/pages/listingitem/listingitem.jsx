import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing}) {
    const [rRs,setRrs]=useState(0);
    const [drs,setDrs]=useState(0)

    useEffect(()=>{
        setRrs(listing.regularPrice);
        setDrs(listing.discountPrice)

    },[])
   
  return (
    <div className='bg-white shadow-md   hover:shadow-lg transition-shadow   overflow-hidden rounded-lg w-[110px] h-[270px] sm:w-[250px] sm:h-[460px]  '>
        <Link to={`/listing/${listing._id}`}>
            <img className='h-[100px] sm:h-[220px]  object-cover hover:scale-105 transition-scale duration-300 ' src={listing.imageUrls[0]} alt="listing cover" />
            <div className="p-1 sm:p-3 flex flex-col gap-2 w-full">
                <p className='truncate text-sm text-center sm:text-lg font-semibold text-slate-700'>{listing.name}</p>
           
           <div className="flex items-center justify-center  gap-1 sm:gap-1 ">

            <MdLocationOn className='text-sm h-3 w-3 sm:h-4  sm:w-4  text-green-700'/>
            
            <p className='text-xs sm:text-sm  text-gray-600 truncate w-full'>{listing.address}
            </p>

           </div>

            <p className='text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3'>{listing.description}</p> 

            <p className= ' text-xs sm:text-sm text-slate-700 mt-0 sm:mt-2 font-semibold'>
            $
                {
                   listing.offer ? drs.toLocaleString() : rRs.toLocaleString()
                }
                {
                    listing.type==='rent' && ' / month'
                }

            </p>
            <div className=' text-slate-700 flex gap-4'>
                <div className=" font-bold text-xs">
                    {listing.bedrooms>1 ? `${listing.bedrooms} beds`:`${listing.bedrooms} bed`}

                </div>
                <div className="font-bold text-xs">
                    {listing.bathrooms>1 ? `${listing.bathrooms} baths`:`${listing.bathrooms} bath`}

                </div>



            </div>
            </div>
        
        </Link>
   
    </div>
  )
}
