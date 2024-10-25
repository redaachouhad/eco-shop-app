"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center gap-8">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p
        onClick={() => {
          router.push("/client_space/products/allProducts");
        }}
        className="bg-blue-500 p-4 font-bold text-white rounded-md shadow-black shadow-sm cursor-pointer"
      >
        Return Home
      </p>
    </div>
  );
}
