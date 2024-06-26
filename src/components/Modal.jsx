"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "@mui/material";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";

export default function Modal({ isOpenx, setIsOpenx, message }) {
  function closeModal() {
    setIsOpenx(false);
  }
  const { data: session } = useSession();

  return (
    <>
      <Transition appear show={isOpenx} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-medium leading-6 text-gray-500`}
                  >
                    แจ้งเตือน
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-gray-500">{message}</p>
                  </div>

                  <div className="mt-4">
                    <Link
                      style={{ textDecoration: "none" }}
                      type="button"
                      className="btn btn-primary text-black contacts"
                      onClick={closeModal}
                      href={"/account/" + session?.user.userid}
                    >
                      ตกลง, เข้าใจแล้ว!
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
