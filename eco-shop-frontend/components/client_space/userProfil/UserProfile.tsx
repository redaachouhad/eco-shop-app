"use client";

import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { UserEntity } from "@ext/typings";
import { Avatar } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function UserProfile() {
  const [showEye1, setShowEye1] = useState(false);
  const [showEye2, setShowEye2] = useState(false);
  const [showEye3, setShowEye3] = useState(false);
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState({
    userEmail: "",
    preferredUsername: "",
    givenName: "",
    familyName: "",
    role: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      const result_session = jwtDecode((session as any)?.accessToken as string);
      const user: UserEntity = {
        userEmail: (result_session as any)?.email as string,
        preferredUsername: (result_session as any)
          ?.preferred_username as string,
        givenName: (result_session as any)?.given_name as string,
        familyName: (result_session as any)?.family_name as string,
      };

      setUserProfile({
        userEmail: (result_session as any)?.email as string,
        preferredUsername: (result_session as any)
          ?.preferred_username as string,
        givenName: (result_session as any)?.given_name as string,
        familyName: (result_session as any)?.family_name as string,
        role: (session as any).roles as string,
      });
    }
  }, [(session as any)?.accessToken]);
  if (!(session as any)?.accessToken) {
    return (
      <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
        <div className="w-full h-full bg-[rgba(0,0,0,0.5)] animate-pulse flex justify-center items-center rounded-lg">
          <GradientCircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="flex flex-col p-4 gap-4 bg-[rgba(0,0,0,0.3)] rounded-lg">
        <p className="text-white text-xl sm:text-2xl font-bold">
          User Profile:
        </p>
        <hr className="border-[rgba(255,255,255,0.4)]" />

        <div className="grid grid-cols-1 lg:grid-cols-2  text-white gap-3">
          <div className="p-2 rounded-lg text-[rgba(255,255,255,0.7)] flex flex-col justify-center items-center gap-4">
            <Avatar
              className="w-48 h-48 md:w-96 md:h-96"
              src={(session as any).user?.image as string}
            />
          </div>
          <div className="p-2 rounded-lg text-[rgba(255,255,255,0.7)] flex flex-col gap-4">
            <p className="text-lg sm:text-xl font-semibold text-white">Infos</p>
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-col">
                <p className="text-sm">First Name: *</p>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={userProfile.givenName}
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1 outline-none w-full text-white"
                />
              </div>
              <div className="w-full flex flex-col">
                <p className="text-sm">Last Name: *</p>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={userProfile.familyName}
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1 outline-none w-full text-white"
                />
              </div>
              <div className="w-full flex flex-col">
                <p className="text-sm">Email: </p>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={userProfile.userEmail}
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1 outline-none w-full text-white"
                />
              </div>
              <div className="w-full flex flex-col">
                <p className="text-sm">Role: </p>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={userProfile.role}
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1 outline-none w-full text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
