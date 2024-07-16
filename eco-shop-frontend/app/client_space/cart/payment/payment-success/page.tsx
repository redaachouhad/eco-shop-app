"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import successImage from "./../../../../../public/icon-logo/success-icon.png";
export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const [downcount, setDowncount] = useState<number>(10);
  const router = useRouter();
  useEffect(() => {
    if (downcount !== 0) {
      setTimeout(() => {
        setDowncount(downcount - 1);
      }, 1000);
    }
  }, [downcount]);

  useEffect(() => {
    if (downcount === 0) {
      router.push("/client_space/orders");
    }
  }, [downcount, router]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-10 text-white text-center border m-10 rounded-md bg-[rgb(38,89,115)] w-[80vmin]">
      <>
        <div className="w-full flex justify-center mb-5">
          <Image
            src={successImage}
            alt="success image"
            width={100}
            height={100}
            className="w-16 sm:w-20"
          />
        </div>
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold mb-2">
          Successful payment
        </h1>
        <h2 className="text-lg sm:text-xl">
          You successfully paid the amount{" "}
          <strong className="text-green-300">{amount} $</strong>{" "}
        </h2>
        <br />
        <h2 className="text-white text-lg">
          {" "}
          you will receive more details about this payment in your email box
        </h2>
        <div className="flex flex-row items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] text-white">
              Loading...
            </span>
          </div>
          <h2 className="p-4">Please wait</h2>
        </div>
        <h2 className="p-4 text-md sm:text-lg">
          Redirect to page of orders in : <strong>{downcount}s</strong>
        </h2>
      </>
    </div>
  );
}
