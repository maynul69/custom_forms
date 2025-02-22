import React, { useEffect, useState } from 'react'
import doc_img from "../../img/Screenshot 2025-02-17 013742.png"
import { IoMdMore } from "react-icons/io";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { Link } from 'react-router';
function RecentTemp() {
  const [qsts, setQsts] = useState([]);
  useEffect(() => {
    fetch("https://custom-forms-server-g2hb.vercel.app/api/questions")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        );
        setQsts(sortedData);
      });
  }, []);
  
  

   
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
      <div className="flex items-center justify-center">
      <div className="docs grid grid-cols-1 md:grid-cols-4 gap-8">
      {qsts?.map((qst, index) => (
        <Link to={`/form/${qst._id}`} key={index}>
        <div 
     
    className="doc_card flex flex-col box-border mr-5 hover:border-[#6e2594]"
  >
    <img 
      src={doc_img} 
      className="doc_img box-border h-36 w-[198px]" 
      alt="Document" 
      title={qst.title}
    />
    <div className="doc_card_content">
      <h2 className='text-lg font-medium'>{qst.title}</h2>
      <p>{qst.description}</p>
      
    </div>
  </div>
        </Link>
))}

      </div>
      </div>
    </div>
  )
}

export default RecentTemp
