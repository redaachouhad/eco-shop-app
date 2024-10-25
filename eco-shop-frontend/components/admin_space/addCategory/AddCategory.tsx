"use client";

import { addListOfCategoriesFct } from "@ext/lib/reduxToolkit/features/listOfCatgories/listOfCategories";
import { useAppSelector } from "@ext/lib/reduxToolkit/hooks";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import {
  addNewCategory,
  getCategories,
} from "@ext/lib/usefulFunctions/usefulFunctions";
import { Category } from "@ext/typings";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdAdd, MdErrorOutline, MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import OneCategory from "./OneCategory";

function AddCategory() {
  const [category, setCategory] = useState<Category>({
    categoryName: "",
  });
  const [error, setError] = useState<String>();
  const [showSpin, setShowSpin] = useState<boolean>();
  const { data: session, status } = useSession();

  const listOfCategories: Category[] = useAppSelector(
    (state) => state.listOfCategories.value
  );
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    const categories: Category[] = await getCategories();
    dispatch(addListOfCategoriesFct(categories));
  };

  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      fetchCategories();
    }
  }, [(session as any)?.accessToken]);

  const fct = () => {
    const result = [];
    for (let index = 0; index < 4; index++) {
      result.push(
        <tr key={index}>
          <td className="py-2 px-4 border-b w-fit">Emily</td>

          <td className="py-2 px-4 border-b w-fit ">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold flex flex-row justify-center items-center gap-2"
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
    return result;
  };

  const onChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onClickAddNewCategory = async () => {
    setShowSpin(true);
    setError("");
    if (category.categoryName === "") {
      setShowSpin(false);
      setError("Please, add the name of category");
      return;
    }
    const message = await addNewCategory(category);
    if (!message?.success) {
      setError(message?.message);
      setShowSpin(false);
      return;
    }
    fetchCategories();
    setShowSpin(false);
    setCategory({
      categoryName: "",
    });
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="flex flex-col p-4 gap-4 bg-[rgba(0,0,0,0.3)] rounded-lg">
        <div className="flex flex-row items-center gap-2 justify-between">
          <p className="text-white text-xl sm:text-2xl font-bold">Categories</p>
        </div>
        <hr className="border-[rgba(255,255,255,0.4)]" />

        <div className="border border-white rounded-lg overflow-hidden">
          <table className="w-full  text-white text-xs sm:text-sm ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-[rgba(0,0,0,0.7)] text-left">
                  Name of category
                </th>

                <th className="py-2 px-4 border-b bg-[rgba(0,0,0,0.7)] text-left w-fit"></th>
              </tr>
            </thead>
            <tbody className="bg-[rgba(255,255,255,0.1)]">
              <tr>
                <td className="py-2 px-2 border-b">
                  <div className="flex flex-col gap-2">
                    <input
                      name="categoryName"
                      type="text"
                      className="outline-none rounded-md p-1 w-full border border-white text-black text-sm"
                      placeholder="add property ..."
                      onChange={onChangeCategory}
                      onClick={() => setError("")}
                      value={category.categoryName}
                    />
                    {error && (
                      <div className="text-xs flex flex-row gap-1 items-center text-yellow-300">
                        <MdErrorOutline className="text-xl" />
                        <p>{error}</p>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-2 px-2 border-b w-fit sm:w-36 ">
                  <button
                    onClick={onClickAddNewCategory}
                    className="bg-blue-700 shadow-sm shadow-black text-white px-2 py-1 rounded-md text-sm font-semibold flex flex-row justify-center items-center gap-1"
                    disabled={showSpin ? true : false}
                  >
                    {showSpin ? (
                      <ImSpinner9 className="text-xl animate-spin" />
                    ) : (
                      <MdAdd className="text-xl" />
                    )}
                    <p>Add</p>
                  </button>
                </td>
              </tr>

              {listOfCategories?.map((item, index) => {
                return <OneCategory key={index} category={item} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
