"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';

import Link from 'next/link';
import axios from 'axios';
import ModalCheck from './ModalCheck';
import Swal from 'sweetalert2';


const Reportpop = ({ isOpen, isOpenx, onClose, product }) => {
  if (!isOpen) return null;
 

  const api = process.env.API_ENDPOINT;
  const [fromData,setFormData] = useState({})

  const [user, setUser] = useState({}); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้
  console.log("🚀 ~ file: Productpopup.jsx:25 ~ Productpopup ~ user:", user)

  const handleSubmit = async(e)=>{
    e.preventDefault();

    // ตรวจสอบว่า username มีในระบบแล้วหรือไม่
    
    Swal.fire({
      icon:"info",
      title:"ต้องสมัครสมาชิก ?",
      showCancelButton: true,
      confirmButtonColor:"green",
      cancelButtonColor:"#E92F07",
      cancelButtonText:"ต้องการยกเลิก",


      
    }).then(async(result)=>{
      if (result.isConfirmed){

        // e.preventDefaulf()
        await axios.post(api+"report",fromData  )
        .then(async (res)=>{
            console.log(res.data.userid)
            
          
            
          }).catch(err=>{
              console.log(err=> console.log(err))
            })
            
          Swal.fire({
            icon:"success",
            title:"เสร็จสิ้น",
            confirmButtonColor:"green",
          }).then(()=>{
            window.location.replace('/')
          })
        }
          


    })

  }
  const handleChange = (e)=>{ 
    setFormData({
        ...fromData,
        [e.target.name]: e.target.value

    })
    
}
console.log(fromData)


  return (
    <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
      <div className="relative w-[80%] h-[80%] rounded-lg">
      <div className="flex items-center justify-center p-12">
  {/* Author: FormBold Team */}
  {/* Learn More: https://formbold.com */}
  
    <div className=" w-[60%] rounded-lg border border-[#e0e0e0] bg-white">
      <div className="flex items-center justify-between rounded-t-lg bg-[#6A64F1] py-4 px-9">
        <h3 className="text-xl font-bold text-white">แจ้งปัญหาารายงาน ? - Online</h3>
        <button onclick="chatboxToogleHandler()" className="text-white"onClick={() => onClose()}>
          
          <svg width={17} height={17} viewBox="0 0 17 17" className="fill-current">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z" />
          </svg>
        </button>
      </div>
      <form action="https://formbold.com/s/FORM_ID" method="POST" className="py-6 px-9 " onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="Username" className="mb-3 block text-base font-medium text-[#07074D]">
            Username
          </label>
          <input onChange={(e) => handleChange(e)} type="text" name="Username" id="Username" placeholder="กรอก Username ให้ถูกต้อง" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
            Email ของคุณ
          </label>
          <input onChange={(e) => handleChange(e)} type="email" name="email" id="email" placeholder="example@domain.com" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
            แจ้งปัญหา
          </label>
          <textarea onChange={(e) => handleChange(e)} rows={4} name="message" id="message" placeholder="หมายเหตุ" className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue={""} />
        </div>
        <div>
          <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
           ส่งคำร้องไปที่ผู้พัฒนา
          </button>
        </div>
      </form>
    </div>
  
  </div>
</div>

      </div>
   
  )
}

export default Reportpop