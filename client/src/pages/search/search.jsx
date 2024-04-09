import React from 'react'

export default function search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">

        <form className='flex flex-col  gap-8'>
            <div className="flex  items-center gap-2 ">
                <label className='whitespace-nowrap font-semibold' >Search Term</label>
                <input type="text" className='border rounded-lg p-3 w-full' id="searchTerm"  placeholder='search'/>

            </div>
            <div className="flex gap-2 flex-warp items-center">
                <label className='font-semibold' >Type:</label>
                <div className="flex gap-2 ">
                    <input type="checkbox"  id="all" className='w-5' />
                    <span>Rent & sale</span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox"  id="rent" className='w-5' />
                    <span>Rent </span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox"  id="sale" className='w-5' />
                    <span>sale</span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox"  id="offer" className='w-5' />
                    <span>offer</span>
                </div>
            </div>


            <div className="flex gap-2 flex-warp items-center">
                <label className='font-semibold' >Ammenities:</label>
                <div className="flex gap-2 ">
                    <input type="checkbox"  id="parking" className='w-5' />
                    <span>Parking</span>
                </div>
                <div className="flex gap-2 ">
                    <input type="checkbox"  id="furnished" className='w-5' />
                    <span>Furnished </span>
                </div>
                
            </div>


            <div className="flex items-center gap-2">
                <label  className='font-semibold'>Sort:</label>
                <select  className='border rounded-lg p-3' id="sort_order">
                    <option >Price high to low</option>
                 <option >Price low to high</option>
                 <option >Latest</option>
                 <option >Oldest</option>

               
               
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
