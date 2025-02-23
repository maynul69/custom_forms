import React from 'react'
import blank from '../../img/Screenshot 2025-02-16 183806.png'
import doc_img from "../../img/image.png"
import { IoMdMore } from "react-icons/io";
import { MdOutlineUnfoldMore } from "react-icons/md";
import uuid from "react-uuid"
import {Link, useNavigate} from "react-router-dom"
import Navbar from '../Components/Navbar';

function Templates() {
  const navigate= useNavigate()
  const createForm=()=>{
    const id_=uuid();
    navigate("/createtemp/" + id_);
    
  }
  return (
    <div>
      <Navbar/>
      <div className='temp_sec bg-gray-100 py-10 '>
      <div className="temp_top mx-[180px] flex flex-row items-center justify-between">
        
        <div className="temp_left">
          <span className='text-base'>Start new form</span>
        

        </div>
        <div className="temp_right flex items-center justify-between">
          <div className="gallery_btn flex flex-row items-center">
            <p>Template Gallery </p> <MdOutlineUnfoldMore />
            
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 transition">
            <IoMdMore />
          </button>
          
        </div>
      </div>
      <div className="temp_body mx-[160px] flex flex-row items-center justify-between">
        <div className="card mt-[15px] ml-[20px]" onClick={createForm}>
          <img src={blank} alt=""  className='box-border h-[120px] w-[171px] rounded-[2px] border-[0.5px] border-[#fffdf7] cursor-pointer hover:border-[1px] hover:border-[#259469]'/>
          <p className="card_title text-sm mt-2 font-medium">Blank Template</p>
        </div>
        <Link to={`/recentTemp`}>
        <div className="card mt-[15px] ml-[20px]">
          <img src={doc_img} alt=""  className='box-border h-[120px] w-[171px] rounded-[2px] border-[0.5px] border-[#fffdf7] cursor-pointer hover:border-[1px] hover:border-[#259469]'/>
          <p className="card_title text-sm mt-2 font-medium">Recent Templates</p>
        </div>
        </Link>
        <div className="card mt-[15px] ml-[20px]">
          <img src={blank} alt=""  className='box-border h-[120px] w-[171px] rounded-[2px] border-[0.5px] border-[#fffdf7] cursor-pointer hover:border-[1px] hover:border-[#259469]'/>
          <p className="card_title text-sm mt-2 font-medium">Blank Template</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Templates
