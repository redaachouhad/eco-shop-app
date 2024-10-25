"use client";

import { formatDateString } from "@ext/lib/usefulFunctions/formatDateString";
import { Order } from "@ext/typings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

function OneItemOrder({ item, argPath }: { item: Order; argPath: string }) {
  const [moveTo, setMoveTo] = useState<boolean>(false);
  const router = useRouter();
  return (
    <tr className="border-t">
      <td className="p-1.5 text-center">{item.orderId}</td>
      <td className="p-1.5 text-center">
        {formatDateString(String(item.orderDateCreation))}
      </td>
      <td className="p-1.5 text-center">{item.orderTotalAmount} $</td>
      <td className="p-1.5 border-transparent flex justify-center">
        <p
          onClick={() => {
            setMoveTo(true);
            router.push("/" + argPath + "/orders/oneOrders/" + item.orderId);
          }}
          className="text-white bg-blue-500 p-1 m-2 rounded-md shadow-sm shadow-black flex flex-row items-center justify-center gap-1 sm:gap-2 w-fit cursor-pointer"
        >
          {moveTo && <ImSpinner9 className="animate-spin" />}
          <span> See more</span>
        </p>
      </td>
    </tr>
  );
}

export default OneItemOrder;
