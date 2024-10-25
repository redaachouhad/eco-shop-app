"use client";

import NavAdminLeftClient from "@ext/components/client_space/navbar_client/NavAdminLeftClient";
import NavBarTop from "@ext/components/NavBarTop";
import TokenExpired from "@ext/components/TokenExpired";
import { store } from "@ext/lib/reduxToolkit/store";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Provider } from "react-redux";
// import imageBg from "./../../public/bg-images/6.png";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  useEffect(() => {
    if ((session as any)?.error == "RefreshAccessTokenError") {
      logout();
    }
  }, [session]);
  return (
    <TokenExpired>
      <Provider store={store}>
        <div
          className="w-full h-[100vh] flex flex-row justify-between relative"
          style={{
            // backgroundImage: "url(" + imageBg.src + ")",
            backgroundImage:
              "radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(31,50,73,1) 100%)",

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <NavAdminLeftClient />
          <div className="w-full h-[100vh] flex flex-col">
            <NavBarTop />
            {children}
          </div>
        </div>
      </Provider>
    </TokenExpired>
  );
}
