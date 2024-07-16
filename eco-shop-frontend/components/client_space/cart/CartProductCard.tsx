"use client";

import { setCartWithProductFct } from "@ext/lib/reduxToolkit/features/cartWithProduct/cartWithProduct";
import { setTotalPriceCartFct } from "@ext/lib/reduxToolkit/features/totalPriceCart/totalPriceCart";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import {
  deleteProductFromCart,
  getCartWithProductsByUserEmail,
} from "@ext/lib/usefulFunctions/usefulFunctions";
import { Cart, CartWithProduct, Product } from "@ext/typings";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { RiDeleteBin5Line } from "react-icons/ri";

interface CartProductCardProps {
  product: Product;
  cart: Cart;
  // image: StaticImageData;
  email: string;
}

function CartProductCard({ product, cart, email }: CartProductCardProps) {
  const onClickDeleteCartWithProduct = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setMoveTo(true);
    await deleteProductFromCart(cart.cartId as number);
    await fetchProductsOfCarts();
  };

  const dispatch = useAppDispatch();
  const fetchProductsOfCarts = async () => {
    const result: CartWithProduct[] = await getCartWithProductsByUserEmail(
      email as string
    );
    dispatch(setCartWithProductFct(result));
    dispatch(setTotalPriceCartFct(result));
  };
  const [moveTo, setMoveTo] = useState<boolean>(false);

  return (
    <div className="flex flex-row bg-[rgba(255,255,255,0.18)] p-2 rounded-md gap-2 sm:gap-4 text-white shadow-sm shadow-black">
      <div className="flex justify-center items-center">
        <Image
          src={product.productImage}
          alt=""
          className="w-52 rounded-md shadow-sm shadow-black"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col w-full justify-between font-semibold gap-2">
        <p className="text-sm sm:text-lg font-bold">{product.productTitle}</p>
        <div className="text-xs sm:text-sm flex flex-row justify-between font-normal">
          <p>Price per unit:</p>
          <p className="font-bold">{cart.pricePerUnit} $</p>
        </div>
        <div className="text-xs sm:text-sm  flex flex-row justify-between font-normal">
          <p>Quantity:</p>
          <p className="font-bold">{cart.selectedProductQuantity}</p>
        </div>
        <hr className="w-full border-white" />
        <div className="text-xs sm:text-sm flex flex-row justify-between">
          <p>Total price:</p>
          <p className="font-bold">
            {cart.pricePerUnit * cart.selectedProductQuantity} $
          </p>
        </div>
        <div className="flex flex-row w-full justify-end">
          <button
            onClick={onClickDeleteCartWithProduct}
            className="p-1 bg-blue-600 text-white text-xs sm:text-sm rounded-md font-medium cursor-pointer shadow-sm shadow-black flex items-center justify-center gap-1"
          >
            {moveTo ? (
              <ImSpinner9 className="animate-spin" />
            ) : (
              <RiDeleteBin5Line />
            )}
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
