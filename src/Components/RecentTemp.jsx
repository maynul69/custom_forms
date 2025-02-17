import React from 'react'
import doc_img from "../../img/Screenshot 2025-02-17 013742.png"
import { IoMdMore } from "react-icons/io";
import { MdOutlineUnfoldMore } from "react-icons/md";
function RecentTemp() {
  return (
    <div className="m-4">
      <div className="top flex m-3.5 flex-row justify-between items-center">
        <div className="top_left text-base font-medium">
          Recent Forms
        </div>
        <div className="top_right flex items-center text-sm mr-32"></div>
        <div className="top_center text-sm mr-32">
          
          
          
        </div>
      </div>
      <div className="docs">
        <div className="doc_card flex flex-col box-border w-[200px mr-5 ] hover:border-[#6e2594] ">
            <img src={doc_img} className='doc_img box-border h-36 w-[198px]' />
            <div className="doc_card_content">
            <button className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 transition">
                      <IoMdMore />
          </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default RecentTemp
