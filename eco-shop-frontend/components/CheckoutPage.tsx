"use client";

import { useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import convertToSubcurrency from "@ext/lib/usefulFunctions/convertToSubcurrency";
import { deleteListOfProductOfCart } from "@ext/lib/usefulFunctions/usefulFunctions";
import { CartWithProduct } from "@ext/typings";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutPage = ({
  amount,
  cartWithProduct,
}: {
  amount: number;
  cartWithProduct: CartWithProduct[];
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const listIdsOfCartToDelete: CartWithProduct[] = useAppSelector(
    (state) => state.listIdsOfCartToDelete.value
  );

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/client_space/cart/payment/payment-success?amount=${amount}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("555555555555555555555");
      await deleteListOfProductOfCart(cartWithProduct);
      console.log("66666666666666666666666666666666");
      window.location.href = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/client_space/cart/payment/payment-success?amount=${amount}`;
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] text-white">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement className="w-full font-bold" />}

      {errorMessage && <div className="text-black">{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-4 bg-blue-700 mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay ${amount}` + " $" : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
