import React from 'react'
import { CiFolderOn } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
function TempHeader() {
  return (
    <div className='flex items-center justify-between pt-2'>
      
      <div className="header_left flex items-center justify-evenly w-[40%]">
        <input className='border rounded-xs text-lg font-normal ml-3.5 text-center' type="text" placeholder='Untitled Form' />
      <CiFolderOn className='mr-2.5 text-xl '/>
      <CiStar className='mr-2.5 text-xl'/>
      <p className='text-xs font-semibold'>All Changes Saved In Database</p>
      </div>
      <div className="header_right flex items-center justify-evenly w-[30%]">
      <IoColorPaletteOutline className='text-xl'/>
      <FaRegEye className='text-xl'/>
      <CiSettings className='text-xl'/>
     
      <IoMdMore className='text-xl'/>
      </div>
    </div>
  )
}

export default TempHeader
