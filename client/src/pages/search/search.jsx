
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function search() {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false);
    const [listings,setListings]=useState([]);

    console.log(listings)

        const [sidebardata,setSideBarData]=useState({
            searchTerm:'',
            type:'all',
            parking:false,
            furnished:false,
            offer:false,
            sort:'createdAt',
            order:'desc',
            
        });


        useEffect(()=>{
           
            const  urlParams=new URLSearchParams(window.location.search);
           
            const searchTermFromUrl=urlParams.get('searchTerm')
            const typeTermFromUrl=urlParams.get('type')
            const parkingTermFromUrl=urlParams.get('parking')
            const furnishedTermFromUrl=urlParams.get('furnished')
            const sortTermFromUrl=urlParams.get('sort')
            const orderTermFromUrl=urlParams.get('order')
            const offerTermFromUrl=urlParams.get('offer')

            if(
                searchTermFromUrl || typeTermFromUrl ||parkingTermFromUrl || furnishedTermFromUrl ||
                sortTermFromUrl || orderTermFromUrl|| offerTermFromUrl

            ){
                setSideBarData({
                    searchTerm:searchTermFromUrl || ' ',
                    type:typeTermFromUrl || 'all',
                    parking:parkingTermFromUrl==='true' ?true:false,
                    furnished:furnishedTermFromUrl==='true'?true:false,
                    offer:offerTermFromUrl==='true'?true:false,
                    order:orderTermFromUrl || 'createdAt',
                    sort:sortTermFromUrl || 'desc'
                });
            }

            const fetchListings=async()=>{
                setLoading(true)
                const searchQuery=urlParams.toString();

                console.log(searchQuery)
                

                const res=await fetch(`/api/listing/get?${searchQuery}`)

                const data=await res.json();
                setListings(data);
                setLoading(false)




            }

            fetchListings()


        },[location.search])



        const handleChange=(e)=>{

            if(e.target.id==='all' || e.target.id==='rent'|| e.target.id==='sale')
            {
                setSideBarData({...sidebardata,type:e.target.id})
            }

            if(e.target.id==='searchTerm')
            {
                setSideBarData({...sidebardata,searchTerm:e.target.value})
            }

            if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer')
            {
                setSideBarData({...sidebardata,[e.target.id]:e.target.checked || e.target.checked=='true' ? true:false})

            }

            if(e.target.id==='sort_order')
            {
                const sort=e.target.value.split('_')[0] || 'createdAt';
                const order=e.target.value.split('_')[1] || 'desc';

                setSideBarData({...sidebardata,sort,order})
            }

        }

const handleSubmit=(e)=>{

    e.preventDefault();

    const urlParams=new URLSearchParams();
    urlParams.set('searchTerm',sidebardata.searchTerm);
    urlParams.set('type',sidebardata.type)
    urlParams.set('parking',sidebardata.parking)
    urlParams.set('furnished',sidebardata.furnished)
    urlParams.set('offer',sidebardata.offer)
    urlParams.set('sort',sidebardata.sort)
    urlParams.set('order',sidebardata.order)

    const searchQuery=urlParams.toString();

    navigate(`/search?${searchQuery}`)



}



  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">

        <form  onSubmit={handleSubmit}className='flex flex-col  gap-8'>
            <div className="flex  items-center gap-2 ">
                <label className='whitespace-nowrap font-semibold' >Search Term</label>
                <input onChange={handleChange} type="text" className='border rounded-lg p-3 w-full' id="searchTerm" value={sidebardata.searchTerm} placeholder='search'/>

            </div>
            <div className="flex gap-2 flex-warp items-center">
                <label className='font-semibold' >Type:</label>
                <div className="flex gap-2 ">
                    <input onChange={handleChange} checked={sidebardata.type==='all'}  type="checkbox"  id="all" className='w-5' />
                    <span>Rent & sale</span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox" onChange={handleChange} checked={sidebardata.type==='rent'}  id="rent" className='w-5' />
                    <span>Rent </span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox"  onChange={handleChange} checked={sidebardata.type==='sale'}  id="sale" className='w-5' />
                    <span>sale</span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox" onChange={handleChange} checked={sidebardata.offer}   id="offer" className='w-5' />
                    <span>offer</span>
                </div>
            </div>


            <div className="flex gap-2 flex-warp items-center">
                <label className='font-semibold' >Ammenities:</label>
                <div className="flex gap-2 ">
                    <input type="checkbox" onChange={handleChange} checked={sidebardata.parking}    id="parking" className='w-5' />
                    <span>Parking</span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox"  onChange={handleChange} checked={sidebardata.furnished}   id="furnished" className='w-5' />
                    <span>Furnished </span>
                </div>
                
            </div>


            <div className="flex items-center gap-2">
                <label  className='font-semibold'>Sort:</label>
                <select defaultValue={'createdAt_desc'}  onChange={handleChange} className='border rounded-lg p-3' id="sort_order">
                    <option value={'regularPrice_desc'} >Price high to low</option>
                 <option value={'regularPrice_asc'}  >Price low to high</option>
                 <option value={'createdAt_desc'}  >Latest</option>
                 <option  value={'createdAt_asc'}>Oldest</option>

               
               
                </select>

            </div>

            <button className='bg-slate-700 text-white p-3 uppercase hover:opacity-90'>Search</button>





        </form>

      </div>
      <div className="flex ">
<h1 className='text-3xl font-semibold border-b p-3 mt-5 text-slate-700'>Listing results:</h1>
      </div>
    </div>
  )
}





