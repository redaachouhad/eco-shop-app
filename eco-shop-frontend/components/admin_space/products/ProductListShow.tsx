"use client";

import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { setFilterOfProductFct } from "@ext/lib/reduxToolkit/features/filterOfProduct/filterOfProduct";
import { setListOfProductsFct } from "@ext/lib/reduxToolkit/features/listOfProducts/listOfProducts";
import { setPageNumberFct } from "@ext/lib/reduxToolkit/features/numberOfPage/numberOfPage";
import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import { getAllProductByFilter } from "@ext/lib/usefulFunctions/usefulFunctions";
import { FilterOfProduct, ProductDtoWithoutProperties } from "@ext/typings";
import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ProductAdmin from "./ProductAdmin";

function ProductListShow({ pathArg }: { pathArg: string }) {
  const productDtoWithoutProperties = useAppSelector(
    (state) => state.listOfProducts.value
  );
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { data: session, status } = useSession();
  const [isPending, setIsPending] = useState<Boolean>(true);
  const totalPages = useAppSelector((state) => state.pageNumber.value);
  const filter: FilterOfProduct = useAppSelector(
    (state) => state.filterOfProduct.value
  );

  const fetchProducts = async () => {
    const responseProductsDto: [ProductDtoWithoutProperties[], number] =
      await getAllProductByFilter(filter);
    dispatch(setListOfProductsFct(responseProductsDto[0]));
    dispatch(setPageNumberFct(responseProductsDto[1]));
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      fetchProducts();
      setIsPending(false);
    }
  }, [(session as any)?.accessToken, filter, page]);

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

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    const newFilter: FilterOfProduct = {
      ...filter,
      page: Number(value) - 1,
    };
    dispatch(setFilterOfProductFct(newFilter));
    router.push("/" + pathArg + "/products/allProducts?page=" + value);
  };

  return isPending ? (
    <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-md animate-pulse">
      <GradientCircularProgress />
    </div>
  ) : (
    <>
      {productDtoWithoutProperties.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 text-white">
          {productDtoWithoutProperties.map((item, index) => {
            return (
              <ProductAdmin
                key={index}
                productNoProp={item}
                pathArg={pathArg}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center text-white">
          <p>There is no product for now</p>
        </div>
      )}

      <div className="w-full flex flex-row justify-center items-center">
        <ThemeProvider theme={theme}>
          <Pagination
            onChange={handleChange}
            count={totalPages}
            variant="outlined"
            shape="rounded"
            page={Number(page)}
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default ProductListShow;
