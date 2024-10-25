"use client";

import { setFilterOfProductFct } from "@ext/lib/reduxToolkit/features/filterOfProduct/filterOfProduct";
import { addListOfCategoriesFct } from "@ext/lib/reduxToolkit/features/listOfCatgories/listOfCategories";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import { getCategories } from "@ext/lib/usefulFunctions/usefulFunctions";
import { Category, FilterOfProduct } from "@ext/typings";
import { createTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { toast } from "react-toastify";

function ProductFilter({ pathArg }: { pathArg: string }) {
  const [showFilter, setShowFilter] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if ((session as any)?.accessToken) {
      const newFilter: FilterOfProduct = {
        ...filter,
        page: 0,
      };
      dispatch(setFilterOfProductFct(newFilter));
      fetchCategories();
    }
  }, [(session as any)?.accessToken]);

  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: "white",
            backgroundColor: "rgba(0,0,255,0.3)",
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "rgba(0,0,255,0.8)",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          },
        },
      },
    },
  });

  const [filter, setFilter] = useState<FilterOfProduct>({
    size: 10,
    page: 0,
    filterMinPrice: 0,
    filterMaxPrice: 0,
    filterCategory: 0,
    filterSortedBy: 0,
  });

  const router = useRouter();

  const onChangeInputFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prevValue) => {
      return { ...prevValue, [e.target.name]: Number(e.target.value) };
    });
  };

  const onChangeSelectFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prevValue) => {
      return { ...prevValue, [e.target.name]: Number(e.target.value) };
    });
  };

  const dispatch = useAppDispatch();
  const listOfCategories: Category[] = useAppSelector(
    (state) => state.listOfCategories.value
  );

  const fetchCategories = async () => {
    const categories: Category[] = await getCategories();
    dispatch(addListOfCategoriesFct(categories));
  };

  const onClickFilter = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      filter.filterMaxPrice < filter.filterMinPrice ||
      (filter.filterMaxPrice === filter.filterMinPrice &&
        filter.filterMinPrice !== 0)
    ) {
      toast.error("Please ensure that : Min Price < Max Price");
      return;
    }
    const newFilter: FilterOfProduct = {
      ...filter,
      page: 0,
    };
    dispatch(setFilterOfProductFct(newFilter));
    router.push("/" + pathArg + "/products/allProducts?page=1");
  };
  return (
    <>
      <div className="w-full flex flex-col p-2 bg-[rgba(0,0,0,0.3)] rounded-md">
        <div className="w-full flex flex-row justify-between items-start">
          <h1 className="text-xl sm:text-2xl lg:text-3xl">Products</h1>
          <div
            className="flex flex-row gap-2 items-end cursor-pointer"
            onClick={() => setShowFilter(true)}
          >
            <IoFilterSharp fontSize={20} />
            <p className="text-xs sm:text-sm">Filter</p>
          </div>
        </div>

        {showFilter && (
          <div className="w-full flex flex-col gap-4 border border-white p-1 rounded-md mt-4">
            <div className="w-full flex flex-row gap-1 items-center justify-between p-2">
              <button
                onClick={() => {
                  setFilter({
                    size: 10,
                    page: 0,
                    filterMinPrice: 0,
                    filterMaxPrice: 0,
                    filterCategory: 0,
                    filterSortedBy: 0,
                  });
                }}
                className="bg-red-500 p-1 rounded-md shadow-sm shadow-black text-sm font-semibold"
              >
                Reset Filter
              </button>

              <div
                onClick={() => setShowFilter(false)}
                className="flex flex-row items-center justify-center gap-1 cursor-pointer"
              >
                <FaWindowClose className="text-md" />
                <p className="text-md">Close</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 rounded-md">
              <div className="flex-col flex gap-1 text-white">
                <p className="text-xs sm:text-sm ">Price (in MAD):</p>

                <div className="flex flex-row gap-2">
                  <input
                    onChange={onChangeInputFilter}
                    value={String(filter.filterMinPrice)}
                    defaultValue={""}
                    type="number"
                    step={1}
                    min={0}
                    name="filterMinPrice"
                    placeholder="Min price"
                    className="bg-transparent w-full border border-white p-1 rounded-sm outline-none"
                  />
                  <input
                    onChange={onChangeInputFilter}
                    value={String(filter.filterMaxPrice)}
                    defaultValue={""}
                    name="filterMaxPrice"
                    type="number"
                    step={1}
                    min={0}
                    placeholder="Max price"
                    className="bg-transparent w-full border border-white p-1 rounded-sm outline-none"
                  />
                </div>
              </div>
              <div className="flex-col flex gap-1">
                <p className="text-xs sm:text-sm text-[rgba(255,255,255)]">
                  Category:
                </p>
                <select
                  onChange={onChangeSelectFilter}
                  value={filter.filterCategory}
                  defaultValue={0}
                  name="filterCategory"
                  className="bg-transparent w-full border border-white p-1 rounded-sm outline-none"
                >
                  <option value={0} className="text-black">
                    --------
                  </option>

                  {listOfCategories.map((item, index) => {
                    return (
                      <option
                        key={item.categoryId}
                        value={item.categoryId}
                        className="text-black"
                      >
                        {item.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex-col flex gap-1">
                <p className="text-xs sm:text-sm text-[rgba(255,255,255)]">
                  Sorted by:
                </p>
                <select
                  onChange={onChangeSelectFilter}
                  name="filterSortedBy"
                  value={filter.filterSortedBy}
                  defaultValue={0}
                  className="bg-transparent w-full border border-white p-1 rounded-sm outline-none"
                >
                  <option value={0} className="text-black">
                    --------
                  </option>
                  <option value={1} className="text-black">
                    Price (Ascendent)
                  </option>
                  <option value={2} className="text-black">
                    Price (Descendent)
                  </option>
                  <option value={3} className="text-black">
                    Rate (Ascendent)
                  </option>
                  <option value={4} className="text-black">
                    Rate (Descendent)
                  </option>
                </select>
              </div>
              <div className="flex flex-row justify-center items-end">
                <button
                  onClick={onClickFilter}
                  type="submit"
                  className="text-sm py-1 px-3 bg-blue-600 rounded-md w-full font-semibold shadow-sm shadow-black"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductFilter;
