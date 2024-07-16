"use client";
import { deletePropertyFromListFct } from "@ext/lib/reduxToolkit/features/listOfPropertiesPerProduct/listOfPropertiesPerProduct";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { Property } from "@ext/typings";
import { MouseEvent } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

function PropertiesOfProduct({
  property,
  index,
}: {
  property: Property;
  index: number;
}) {
  const dispatch = useAppDispatch();
  const onClickDelete = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(deletePropertyFromListFct(index));
    return;
  };

  return (
    <tr>
      <td className="py-2 px-4 border-b">{property?.propertyName}</td>
      <td className="py-2 px-4 border-b">{property?.propertyValue}</td>
      <td className="py-2 px-4 border-b w-fit ">
        <button
          onClick={onClickDelete}
          className="bg-red-500 text-white px-2 py-1 rounded-md text-sm shadow-sm shadow-black font-bold flex flex-row gap-1 items-center"
        >
          <MdOutlineDeleteForever className="text-xl" />
          <p>Delete</p>
        </button>
      </td>
    </tr>
  );
}

export default PropertiesOfProduct;
