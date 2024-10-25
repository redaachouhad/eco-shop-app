"use client";

import NavAdminLeft from "@ext/components/admin_space/navbar/NavAdminLeft";
import NavBarTop from "@ext/components/NavBarTop";
import { store } from "@ext/lib/reduxToolkit/store";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Provider } from "react-redux";

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
    <Provider store={store}>
      <div className="w-full h-[100vh] flex flex-row justify-between relative bg-blue-600">
        <NavAdminLeft />
        <div className="w-full flex flex-col">
          <NavBarTop />
          {children}
        </div>
      </div>
    </Provider>
  );
}
