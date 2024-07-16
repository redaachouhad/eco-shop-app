"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    await signIn("keycloak", {
      callbackUrl: "/client_space/addingUser",
      redirect: true,
    });
  };

  // Reset session state when signing out

  return (
    <main className="h-full w-full">
      <div className="w-full h-[100vh] ring flex flex-col justify-center items-center ">
        {/* {session && <div>{session?.accessToken as string}</div>} */}

        <button
          onClick={handleSignIn}
          className="text-white bg-blue-500 p-2 rounded-md shadow-black shadow-sm"
        >
          Sign in
        </button>
      </div>
    </main>
  );
}
