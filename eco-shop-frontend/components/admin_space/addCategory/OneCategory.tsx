"use client";

import { addListOfCategoriesFct } from "@ext/lib/reduxToolkit/features/listOfCatgories/listOfCategories";
import {
  deleteCategory,
  getCategories,
} from "@ext/lib/usefulFunctions/usefulFunctions";
import { Category } from "@ext/typings";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";

function OneCategory({ category }: { category: Category }) {
  const [showSpin, setShowSpin] = useState<boolean>();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    const categories: Category[] = await getCategories();
    dispatch(addListOfCategoriesFct(categories));
  };

  const onClickDeleteCategory = async () => {
    setShowSpin(true);
    const res = await deleteCategory(category?.categoryId as number);
    await fetchCategories();
    setShowSpin(false);
  };

  return (
    <tr>
      <td className="py-2 px-4 border-b w-fit">{category.categoryName}</td>
      <td className="py-2 px-4 border-b w-fit ">
        <button
          onClick={onClickDeleteCategory}
          className="bg-red-500 shadow-sm shadow-black text-white px-2 py-1 rounded-md text-sm font-semibold flex flex-row justify-center items-center gap-2"
          disabled={showSpin ? true : false}
        >
          {showSpin ? (
            <ImSpinner9 className="text-xl animate-spin" />
          ) : (
            <MdOutlineDeleteForever className="text-xl" />
          )}
          <p>Delete</p>
        </button>
      </td>
    </tr>
  );
}

export default OneCategory;
