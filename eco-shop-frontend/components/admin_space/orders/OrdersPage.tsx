"use client";

import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { getOrdersByUserEmail } from "@ext/lib/usefulFunctions/usefulFunctions";
import { Order } from "@ext/typings";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OneItemOrder from "./OneItemOrder";

function OrdersPage({ argPath }: { argPath: string }) {
  const { data: session, status } = useSession();
  const [listOfOrders, setListOfOrders] = useState<Order[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [moveTo, setMoveTo] = useState<boolean>(false);

  async function gettingListOfOrders() {
    const result_session = jwtDecode((session as any)?.accessToken as string);

    const responseListOfOrders1 = await getOrdersByUserEmail(
      (result_session as any)?.email as string,
      argPath
    );
    setListOfOrders(responseListOfOrders1);

    setPending(false);
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      gettingListOfOrders();
    }
  }, [(session as any)?.accessToken]);
  const router = useRouter();

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
        Orders of Customers:
      </h1>
      {pending ? (
        <div className="w-full h-full bg-[rgba(0,0,0,0.4)] rounded-md flex justify-center items-center">
          <GradientCircularProgress />
        </div>
      ) : (
        <div className="w-full">
          <table className="w-full border border-gray-500 rounded-lg overflow-hidden text-white text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="p-1.5 border-b bg-[rgba(0,0,0,0.8)] text-center">
                  <p> Order Id</p>
                </th>
                <th className="p-1.5 border-b bg-[rgba(0,0,0,0.8)] text-center">
                  <p> Date of order</p>
                </th>
                <th className="p-1.5 border-b bg-[rgba(0,0,0,0.8)] text-center">
                  <p> Paid Amount</p>
                </th>
                <th className="p-1.5 border-b bg-[rgba(0,0,0,0.8)] text-center">
                  <p>Order details</p>
                </th>
              </tr>
            </thead>
            <tbody className="bg-[rgba(0,0,0,0.5)]">
              {listOfOrders.map((item, index) => {
                return (
                  <OneItemOrder key={index} item={item} argPath={argPath} />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
