"use client";
import React, { useEffect, useState } from "react";
import "@/app/password/[id]/styes.css";
import { useSession } from "next-auth/react";
import axios from "axios";

const mypassword = () => {
  const { data: session } = useSession();
  const api = process.env.API_ENDPOINT;
  const [formdata, setFormProfile] = useState({});
  const [passworddata, setpasworddata] = useState({});
  const id = session?.user?.userid;

  useEffect(() => {
    console.log(formdata);
    if (session?.user?.userid) {
      axios
        .get(`${api}register/${session.user.userid}`)
        .then((response) => {
          setFormProfile(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user avatar:", error);
        });
      console.log(session.user.password);
    }
  }, [api, session?.user?.userid]);

  const handleSubmit = async (e) => {
    Swal.fire({
      title: "กำลังทำรายการ",
      html: '<button className="btn btn-primary" type="button" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>',
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    e.preventDefault();
    if (passworddata) {
      Swal.fire({
        icon: "error",
        title: "Password not found",
        confirmButtonColor: "red",
      });
      return;
    }
    const postData = await fetch(api + "register/" + id, {
      method: "PUT",
      body: JSON.stringify({
        password: formdata.newPassword,
        updatedby: session?.user.nickname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res !== null) {
          Swal.fire({
            title: "password edit success",
            text: "แก้ไข!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ตกลง",
          }).then((result) => {
            if (result.isConfirmed) {
              {
                window.location.replace("/account/" + session?.user.userid);
              }
            }
          });
        }
      });
  };
  const handpasswordchange = async (e) => {
    const newPassword = e.target.value;

    if (newPassword) {
      const userpasswordsInSystem = session?.user?.password; // ดึงชื่อผู้ใช้จากข้อมูลผู้ใช้ในระบบ
      setpasworddata(userpasswordsInSystem.includes(newPassword));
    } else {
      setpasworddata(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="#">
      <div className="p-10">
        <div className="fix ">
          <div className="text">Edit Password</div>
          <div className="pt-10">
            <div className="pt-12">
              <input
                type="text"
                className="input"
                onChange={(e) => {
                  handpasswordchange(e);
                }}
                defaultValue={formdata.oldPassword}
                placeholder="Old password"
              ></input>
            </div>
            <input
              type="text"
              className="input"
              onChange={(e) => {
                handpasswordchange(e);
              }}
              defaultValue={formdata.newPassword}
              placeholder="New password"
            ></input>
            <div className="fixbut">
              <button className="button">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default mypassword;
