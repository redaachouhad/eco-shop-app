"use client";

import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { formatDateString } from "@ext/lib/usefulFunctions/formatDateString";
import { getOneOrderByOrderIdWithDetails } from "@ext/lib/usefulFunctions/usefulFunctions";
import { OrderWithUserWithBoughtProducts } from "@ext/typings";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoPerson, IoTimeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

function OneOrder({ argPath }: { argPath: string }) {
  const router = useRouter();
  const [orderWithUserWithBoughtProducts, setOrderWithUserWithBoughtProducts] =
    useState<OrderWithUserWithBoughtProducts>();

  const [pending, setPending] = useState<boolean>(true);

  const { data: session, status } = useSession();
  const orderId = Number(usePathname().split("/")[4]);

  const fetchingOneOrderDetails = async () => {
    const responseOrderDetails: OrderWithUserWithBoughtProducts =
      await getOneOrderByOrderIdWithDetails(orderId);
    setOrderWithUserWithBoughtProducts(responseOrderDetails);
    setPending(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      fetchingOneOrderDetails();
    }
  }, [(session as any)?.accessToken]);

  return (
    <div className="w-full h-full p-2 sm:p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="w-full flex flex-row justify-start">
        <p
          onClick={() => router.back()}
          className="text-white text-md font-semibold flex flex-row items-center gap-2 hover:underline cursor-pointer w-fit"
        >
          <FaArrowLeft />
          <span>Go back</span>
        </p>
      </div>

      <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
        Order ID : 1
      </h1>
      {pending ? (
        <div className="w-full h-full bg-[rgba(0,0,0,0.4)] rounded-md flex justify-center items-center">
          <GradientCircularProgress />
        </div>
      ) : (
        <>
          <div className="text-white">
            <p className="text-xl">Order details:</p>
            <div className="bg-[rgba(0,0,0,0.6)]   p-3 flex flex-col rounded-md gap-2 text-md">
              <div className="flex flex-row items-center gap-2">
                <IoTimeOutline size={23} />
                <p>
                  Order Date :{" "}
                  <span className="text-[rgb(65,236,65)]">
                    {" "}
                    {formatDateString(
                      String(
                        orderWithUserWithBoughtProducts?.order.orderDateCreation
                      )
                    )}
                  </span>{" "}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <RiMoneyDollarBoxLine size={23} />
                <p>
                  Total Amount :{" "}
                  <span className="text-[rgb(65,236,65)]">
                    {" "}
                    {orderWithUserWithBoughtProducts?.order.orderTotalAmount} $
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="text-white">
            <p className="text-xl">User details:</p>
            <div className="bg-[rgba(0,0,0,0.6)]   p-3 flex flex-col rounded-md gap-2 text-md">
              <div className="flex flex-row items-center gap-2">
                <IoPerson size={23} />
                <p>
                  Full name :{" "}
                  <span className="text-[rgb(65,236,65)]">
                    {orderWithUserWithBoughtProducts?.userEntity.givenName +
                      " " +
                      orderWithUserWithBoughtProducts?.userEntity.familyName}
                  </span>
                </p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <MdOutlineEmail size={23} />
                <p>
                  Email :{" "}
                  <span className="text-[rgb(65,236,65)]">
                    {orderWithUserWithBoughtProducts?.userEntity.userEmail}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xl text-white">Bought Products:</p>
            <table className="w-full border border-gray-500 rounded-lg overflow-hidden text-white text-xs sm:text-sm">
              <thead>
                <tr>
                  <th className="p-2 border-b bg-[rgba(0,0,0,0.8)] text-center">
                    Product Name
                  </th>

                  <th className="p-2 border-b bg-[rgba(0,0,0,0.8)] text-center">
                    Price per unit
                  </th>

                  <th className="p-2 border-b bg-[rgba(0,0,0,0.8)] text-center">
                    Quantity
                  </th>
                  <th className="p-2 border-b bg-[rgba(0,0,0,0.8)] text-center">
                    Total price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[rgba(0,0,0,0.5)]">
                {orderWithUserWithBoughtProducts?.boughtProducts.map(
                  (item, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-2 border-b text-center">
                          {item.productName}
                        </td>
                        <td className="p-2 border-b text-center">
                          {item.boughtProductPricePerUnit} $
                        </td>
                        <td className="p-2 border-b text-center">
                          {item.boughtProductQuantity}
                        </td>
                        <td className="p-2 border-b text-center">
                          {item.boughtProductPricePerUnit *
                            item.boughtProductQuantity}{" "}
                          $
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default OneOrder;
