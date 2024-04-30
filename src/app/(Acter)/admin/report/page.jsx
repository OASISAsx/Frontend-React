'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'moment/min/locales';
import Swal from 'sweetalert2';




const report = () => {
  const [data, setData] = useState([])
  
  const api = process.env.API_ENDPOINT;
  useEffect(() => {

    loadData()
  }, [])

  const loadData = async () => {
    const res = await axios.get(api + "reports")

    setData(res.data)

  }
 
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'ต้องการลบบัญชีนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'ยืนยัน',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน!',
  }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "report/" + id)
        .then(res => {
          loadData()
                  loadData()
                      .catch(err => console.log(err))
              })
          Swal.fire(
              'ลบสำเร็จ!',
              'คุณได้ทำการลบผู้ใช้!',
              'สำเร็จ'
          )
      }
  })
  }

 

  

  return (
    <>

      <div className="max-w-2xl py-2 lg:max-w-none justify-center">
      <h2 className="text-xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium py-4">รายงาน</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ลำดับ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ชื่อ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    อีเมล
                  </th>
                  <th scope="col" className="px-12 py-3 ">
                    ปัญหา
                  </th>
                  <th scope="col" className="px-12 py-3 ">
                    ลบ
                  </th>
                </tr>
              </thead>

            <tbody>
              {data.map((item, index) =>
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                    {index + 1}
                  </th>

                  <td className="px-6 py-4">
                    {item.username}
                  </td>
                  <td className="px-6 py-3">
                    {item.email}
                  </td>
                  <td className="px-10 py-6">
                    {item.message}
                  </td>
                

                  <td >
                  <button className="iconTrash ml-8">
                  <button type="button" onClick={() => handleDelete(item.reportid)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ลบ</button>
                       
                      </button>
                  </td>

                  


                </tr>



              )}

            </tbody>
          </table>
        </div>

      </div>



    </>
  )
}

export default report