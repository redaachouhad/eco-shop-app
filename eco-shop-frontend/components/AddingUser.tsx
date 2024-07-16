"use client";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { addUsers } from "@ext/lib/usefulFunctions/usefulFunctions";
import { UserEntity } from "@ext/typings";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GradientCircularProgress } from "./loadingSpin/Spins";

function AddingUser({ argPath }: { argPath: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function addingUsers() {
    const result_session = jwtDecode((session as any)?.accessToken as string);
    const user: UserEntity = {
      userEmail: (result_session as any)?.email as string,
      preferredUsername: (result_session as any)?.preferred_username as string,
      givenName: (result_session as any)?.given_name as string,
      familyName: (result_session as any)?.family_name as string,
    };

    const response = await addUsers(user);
    if (argPath === "client_space") {
      router.push("/client_space/products/allProducts?page=1");
    } else if (argPath === "admin_space") {
      router.push("/admin_space/dashboard");
    }
  }

  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      addingUsers();
    }
  }, [(session as any)?.accessToken]);

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="w-full h-full bg-[rgba(0,0,0,0.4)] rounded-md flex justify-center items-center text-white gap-3">
        <p>Please Wait</p>
        <GradientCircularProgress />
      </div>
    </div>
  );
}

export default AddingUser;
