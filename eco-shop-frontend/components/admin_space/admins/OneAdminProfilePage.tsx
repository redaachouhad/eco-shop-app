"use client";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdKey } from "react-icons/md";
import { RiSave3Line } from "react-icons/ri";

function OneAdminProfilePage() {
  const [showEye1, setShowEye1] = useState(false);
  const [showEye2, setShowEye2] = useState(false);
  const [showEye3, setShowEye3] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showLeftMenuFct(false));
  }, []);
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="flex flex-col p-4 gap-4 bg-[rgba(0,0,0,0.3)] rounded-lg">
        <p className="text-white text-xl sm:text-2xl font-bold">
          Admin Profile:
        </p>
        <hr className="border-[rgba(255,255,255,0.4)]" />

        <div className="grid grid-cols-1 lg:grid-cols-2  text-white gap-3">
          <div className="p-2 rounded-lg text-[rgba(255,255,255,0.7)] flex flex-col justify-center items-center gap-4">
            <Avatar className="w-48 h-48 md:w-96 md:h-96" />
          </div>
          <div className="p-2 rounded-lg text-[rgba(255,255,255,0.7)] flex flex-col gap-4">
            <p className="text-lg sm:text-xl font-semibold text-white">Infos</p>
            <form action="" className="flex flex-col gap-4">
              <div className="w-full flex flex-col">
                <p className="text-sm">First Name: *</p>
                <input
                  type="text"
                  placeholder="Your First Name ..."
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1 outline-none w-full"
                />
              </div>
              <div className="w-full flex flex-col">
                <p className="text-sm">Last Name: *</p>
                <input
                  type="text"
                  placeholder="Your Last Name ..."
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1 outline-none w-full"
                />
              </div>
              <div className="w-full flex flex-col">
                <p className="text-sm">Email: </p>
                <input
                  type="text"
                  placeholder="example@yahoo.com ..."
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1 outline-none w-full"
                />
              </div>

              <div>
                <p className="text-sm">Change Image:</p>
                <input
                  type="file"
                  name="fileImage"
                  id="fileImage"
                  className="text-sm"
                />
              </div>
              <div className="flex flex-row justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-fit shadow-black shadow-sm p-1.5 rounded-md flex flex-row items-center gap-1"
                >
                  <RiSave3Line fontSize={20} />
                  <span>Save</span>
                </button>
              </div>
            </form>
            <h1 className="text-lg sm:text-xl font-semibold text-white">
              Changing Password
            </h1>
            <form action="">
              <div className="flex flex-col">
                <p>Old password</p>

                <div className="flex flex-row items-center bg-[rgba(0,0,0,0.2)] gap-2 rounded-md w-fit text-white">
                  <input
                    type={showEye1 ? "password" : "text"}
                    name=""
                    id=""
                    className="w-full bg-transparent p-1 outline-none"
                  />
                  <div
                    className="h-full p-2"
                    onClick={() => setShowEye1(!showEye1)}
                  >
                    {showEye1 ? (
                      <FaEye fontSize={20} />
                    ) : (
                      <FaEyeSlash fontSize={20} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <p>New password</p>

                <div className="flex flex-row items-center bg-[rgba(0,0,0,0.2)] gap-2 rounded-md w-fit text-white">
                  <input
                    type={showEye2 ? "password" : "text"}
                    name=""
                    id=""
                    className="w-full bg-transparent p-1 outline-none"
                  />
                  <div
                    className="h-full p-2"
                    onClick={() => setShowEye2(!showEye2)}
                  >
                    {showEye2 ? (
                      <FaEye fontSize={20} />
                    ) : (
                      <FaEyeSlash fontSize={20} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <p>Confirm new password</p>

                <div className="flex flex-row items-center bg-[rgba(0,0,0,0.2)] gap-2 rounded-md w-fit text-white">
                  <input
                    type={showEye3 ? "password" : "text"}
                    name=""
                    id=""
                    className="w-full bg-transparent p-1 outline-none"
                  />
                  <div
                    className="h-full p-2"
                    onClick={() => setShowEye3(!showEye3)}
                  >
                    {showEye3 ? (
                      <FaEye fontSize={20} />
                    ) : (
                      <FaEyeSlash fontSize={20} />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <button
                  type="submit"
                  className="bg-[rgba(47,98,114,0.8)] text-white w-fit shadow-black shadow-sm p-1.5 rounded-md flex flex-row items-center gap-1"
                >
                  <MdKey fontSize={20} />
                  <span>Change Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneAdminProfilePage;
