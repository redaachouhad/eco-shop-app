"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

function TokenExpired({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  useEffect(() => {
    if ((session as any)?.error === "RefreshAccessTokenError") {
      logout();
    }
  }, [session]);

  return <>{children}</>;
}

export default TokenExpired;
