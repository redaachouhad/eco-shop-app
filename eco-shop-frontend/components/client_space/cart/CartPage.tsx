"use client";

import CheckoutPage from "@ext/components/CheckoutPage";
import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { setCartWithProductFct } from "@ext/lib/reduxToolkit/features/cartWithProduct/cartWithProduct";
import { setTotalPriceCartFct } from "@ext/lib/reduxToolkit/features/totalPriceCart/totalPriceCart";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import { getCartWithProductsByUserEmail } from "@ext/lib/usefulFunctions/usefulFunctions";
import { CartWithProduct, OrderDto } from "@ext/typings";
import { Elements } from "@stripe/react-stripe-js";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import CartProductCard from "./CartProductCard";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { loadStripe } from "@stripe/stripe-js";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("next public stripe PUBLIC KEY is not defined");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CartPage() {
  const [userEmail, setUserEmail] = useState<string>();
  const totalPrice = useAppSelector((state) => state.totalPriceCart.value);
  const productsOfCart = useAppSelector((state) => state.cartWithProduct.value);
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const [orderDto, setOrderDto] = useState<OrderDto>();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  // const [productsOfCart, setProductsOfCart] = useState<CartWithProduct[]>([]);

  const fetchProductsOfCarts = async () => {
    const result_session = jwtDecode((session as any)?.accessToken as string);
    setUserEmail((result_session as any)?.email as string);
    const result: CartWithProduct[] = await getCartWithProductsByUserEmail(
      (result_session as any)?.email as string
    );

    dispatch(setCartWithProductFct(result));

    dispatch(setTotalPriceCartFct(result));
  };

  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      setSpin(true);
      fetchProductsOfCarts();
      setSpin(false);
    }
  }, [(session as any)?.accessToken]);

  const [spin, setSpin] = useState<boolean>(true);
  // const amount: number = 600;
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const onClickCheckout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (totalPrice === 0) {
      toast.error("Please add products to the cart.");
      return;
    }
    setShowPayment(true);
    return;
  };

  return (
    <div className="w-full h-[calc(100vh-7rem)] p-2 sm:p-4 flex flex-col gap-4 relative">
      <h1 className="text-white text-2xl lg:text-3xl font-semibold">
        Shopping Cart:
      </h1>

      <div className="w-full h-full flex flex-col sm:flex-row gap-2 sm:gap-4 relative">
        {!spin ? (
          productsOfCart.length !== 0 ? (
            <div className="w-full h-full flex flex-col gap-2 p-2  rounded-md overflow-y-scroll custom-scrollbar">
              {productsOfCart.map((item, index) => {
                return (
                  <CartProductCard
                    key={index}
                    product={item.product}
                    cart={item.cart}
                    email={userEmail as string}
                  />
                );
              })}
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: black;
                  border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                  background: white;
                  border-radius: 10px;
                }
              `}</style>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-2 p-2 rounded-md text-white">
              <p>The shopping cart is empty</p>
            </div>
          )
        ) : (
          <div className="w-full h-full bg-[rgba(0,0,0,0.4)] rounded-md animate-pulse flex justify-center items-center">
            <GradientCircularProgress />
          </div>
        )}
        <div className="flex flex-col items-center justify-start p-3 gap-2 sm:gap-6 bg-[rgba(0,0,0,0.6)] text-xs sm:text-sm rounded-md w-full sm:w-[40rem] h-fit">
          <h1 className="text-white text-xl font-bold">Order Summary</h1>
          <hr className="w-full border border-white" />
          <p className="w-full flex justify-between text-sm text-white font-semibold">
            <span>Number of items:</span>
            <span>{productsOfCart.length}</span>
          </p>
          <p className="w-full flex justify-between text-sm text-white font-semibold">
            <span>Total Price:</span>
            <span>{totalPrice} $</span>
          </p>
          {showPayment && totalPrice !== 0 ? (
            <div className="w-full">
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: Math.round(totalPrice * 100),
                  currency: "usd",
                }}
              >
                <CheckoutPage
                  amount={Math.round(totalPrice * 100) / 100}
                  cartWithProduct={productsOfCart as CartWithProduct[]}
                />
              </Elements>
            </div>
          ) : (
            <button
              onClick={onClickCheckout}
              className="p-2 flex flex-row items-center justify-center gap-1 text-white bg-blue-600 shadow-sm shadow-black rounded-md cursor-pointer w-full text-sm font-bold"
            >
              <p>Checkout</p>
              <FaArrowRightLong />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
