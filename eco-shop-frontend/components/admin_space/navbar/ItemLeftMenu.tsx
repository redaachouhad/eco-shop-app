"use client";

import { setFilterOfProductFct } from "@ext/lib/reduxToolkit/features/filterOfProduct/filterOfProduct";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import { FilterOfProduct } from "@ext/typings";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface ItemLeftMenuProps {
  title: string;
  path: string;
  icon: React.JSX.Element;
}

function ItemLeftMenu({ title, path, icon }: ItemLeftMenuProps) {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const filter: FilterOfProduct = useAppSelector(
    (state) => state.filterOfProduct.value
  );
  const changingFilter = async () => {
    const newFilter: FilterOfProduct = {
      ...filter,
      page: 0,
    };
    dispatch(setFilterOfProductFct(newFilter));
  };

  const pathStartWithArg = (path: string) => {
    const newPath = path.split("?")[0];
    const listWords = newPath.split("/");
    return "/" + listWords[1] + "/" + listWords[2];
  };

  return (
    <div
      className={
        "flex flex-row items-start gap-4 p-3 cursor-pointer " +
        (pathName.startsWith(pathStartWithArg(path))
          ? "bg-[rgba(255,255,255,0.3)] "
          : "hover:bg-[rgba(255,255,255,0.1)] ")
      }
      onClick={async () => {
        if (title != "Logout") {
          router.push(path);
          if (title === "Products") {
            await changingFilter();
          }
        } else {
          await signOut({ callbackUrl: "/" });
        }
      }}
    >
      {icon}
      <p className="text-md">{title}</p>
    </div>
  );
}

export default ItemLeftMenu;
