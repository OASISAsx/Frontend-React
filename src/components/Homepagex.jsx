"use client";
import { Link } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Productpopup from "./Productpopup";
import Reportpop from "./Reportpop";

const Homepagex = ({}) => {
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [show, setshow] = useState(false);
  const [shows, setshows] = useState(false);
  const [product, setproduct] = useState({});
  const [userid, setuserid] = useState({});
  console.log("🚀 ~ file: Homepagex.jsx:13 ~ Homepagex ~ userid:", userid);
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (query === "") {
      loadData();
    } else {
      handleSearch("");
    }
  }, []);

  const loadData = async () => {
    fetch(api + "products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const handleSearch = async (e) => {
    const prop = e.target.value;
    // console.log(prop);
    setQuery(prop);

    // ส่งคำค้นหาไปยัง API หรือฐานข้อมูลของคุณเพื่อค้นหาสินค้าที่ตรงกับคำค้นหา
    // คุณอาจต้องอัปเดตข้อมูลสินค้าในส่วนนี้
    // ตัวอย่าง:
    const apiUrl = `${api}products?search=${query}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  return (
    <>
      <Fragment>
        <div className="sm:h-[300px] slides items-center -mt-10">
          <div className="slide slide--1">
            <img
              src="https://res.cloudinary.com/dvtvwkwig/image/upload/v1712763890/Collector/acvigpzkeqatjdyumzsr.png"
              className="slide_image"
            />
          </div>
          <div className="slide slide--2">
            <img
              src="https://res.cloudinary.com/dvtvwkwig/image/upload/v1712763892/Collector/qbvbqssoudzpcurhzenf.png"
              className="slide_image"
            />
          </div>
          <div className="slide slide--3">
            <img
              src="https://res.cloudinary.com/dvtvwkwig/image/upload/v1712763891/Collector/ibmhstlyqsracxevlxb5.png"
              className="slide_image"
            />
          </div>
        </div>
        <br></br>
        <form className="w-[50%]">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              onChange={handleSearch}
              value={query}
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ค้นหาสินค้าที่ต้องการ..."
              required
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault(); // ป้องกันการส่งฟอร์ม
                handleSearch(query); // เรียกใช้งานฟังก์ชัน handleSearch และส่งค่า query ไปด้วย
              }}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <p className="justify-items-start mt-7 ml-52 product text-xl">
          {" "}
          สินค้าทั้งหมด
        </p>
        <div className=" container  justify-center  ">
          <div className="product ml-9 mb-20">
            {data.map((item, index) => {
              const isMatch =
                item.productname &&
                item.producttype.toLowerCase().includes(query.toLowerCase());

              // กรองเฉพาะรายการที่ตรงกับการค้นหา
              if (!isMatch) {
                return null;
              }
              if (item.status === "ลงขายสินค้าสำเร็จ") {
                return (
                  <div key={index}>
                    <div className="product-items mt-3">
                      <Link
                        onClick={() => {
                          setshow(true), setproduct(item);
                        }}
                        href={"#/productdetail/" + item.productid}
                        style={{ textDecoration: "none" }}
                      >
                        <img className="product-img" src={item.productimages} />
                        <div>
                          <div
                            className="font-bold   text-primary my-3"
                            align="LEFT"
                            valign="top"
                            style={{ fontSize: "1vw " }}
                          >
                            {item.productname}
                          </div>
                          <div className="pull-right">
                            <div
                              className="font-bold text-xl  text-primary "
                              style={{ fontSize: "1.0vw " }}
                            >
                              {item.productstock}ชิ้น
                            </div>

                            {item.sellstatus ? (
                              <span className=" text-red-500 text-l font-semibold">
                                ขายแล้ว
                              </span>
                            ) : (
                              <span className="font-bold text-l text-primary  ">
                                {item.productprice}฿
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="report  p-12 mr-auto">
          <button>
            <Link
              onClick={() => {
                setshows(true);
              }}
              className="report flex -mr-auto h-[50px] w-[50px] items-center justify-center rounded-full bg-[#6A64F1] text-white"
            >
              <span className="cross-icon hidden">
                <svg
                  width={10}
                  height={10}
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className="chat-icon">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.8333 14.0002V3.50016C19.8333 3.19074 19.7103 2.894 19.4915 2.6752C19.2728 2.45641 18.976 2.3335 18.6666 2.3335H3.49992C3.1905 2.3335 2.89375 2.45641 2.67496 2.6752C2.45617 2.894 2.33325 3.19074 2.33325 3.50016V19.8335L6.99992 15.1668H18.6666C18.976 15.1668 19.2728 15.0439 19.4915 14.8251C19.7103 14.6063 19.8333 14.3096 19.8333 14.0002ZM24.4999 7.00016H22.1666V17.5002H6.99992V19.8335C6.99992 20.1429 7.12284 20.4397 7.34163 20.6585C7.56042 20.8772 7.85717 21.0002 8.16659 21.0002H20.9999L25.6666 25.6668V8.16683C25.6666 7.85741 25.5437 7.56066 25.3249 7.34187C25.1061 7.12308 24.8093 7.00016 24.4999 7.00016Z"
                    fill="white"
                  />
                </svg>
              </span>
            </Link>
          </button>
        </div>

        <Productpopup
          isOpen={show}
          onClose={() => setshow(false)}
          product={product}
        />
        <Reportpop
          isOpen={shows}
          onClose={() => setshows(false)}
          product={product}
        />
      </Fragment>
      {/* component */}
    </>
  );
};

export default Homepagex;
