"use client";
import { ProductDtoWithoutProperties } from "@ext/typings";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ProductAdminProps {
  productNoProp: ProductDtoWithoutProperties;
  pathArg: string;
}

function ProductAdmin({ productNoProp, pathArg }: ProductAdminProps) {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(
          "/" +
            pathArg +
            "/products/oneProduct/" +
            productNoProp.product.productId
        )
      }
      className=" bg-[rgba(0,0,0,0.5)] p-2 rounded-md cursor-pointer hover:-translate-y-1 translate-y-0 transition-translation duration-500 hover:shadow-lg hover:shadow-black flex flex-col justify-between"
    >
      <p className="text-sm mb-2 bg-[rgba(255,255,255,0.2)] w-fit p-0.5 font-normal rounded-md">
        {productNoProp.category.categoryName}
      </p>
      <div className="w-full mb-2 rounded-md flex justify-center items-center">
        <Image
          src={productNoProp.product.productImage}
          alt="image of product"
          className="rounded-md w-full"
          width={100}
          height={100}
          unoptimized={true}
        />
      </div>
      <div>
        <p className="w-full mb-2 text-xs sm:text-sm font-semibold">
          {productNoProp.product.productTitle}
        </p>
        <div className="flex flex-row gap-2 items-center">
          <Rating
            name="read-only"
            value={productNoProp.product.productRating}
            precision={0.5}
            readOnly
            sx={{
              "& .MuiRating-iconEmpty": {
                color: "white",
              },
            }}
            className="text-xl"
          />
          <div>
            <p className="text-sm text-gray-200">
              {productNoProp.product.productRating}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-2">
          <p className="text-xs sm:text-sm font-light">Price:</p>
          <p className="text-sm font-bold">
            {productNoProp.product.productPrice} $
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductAdmin;
