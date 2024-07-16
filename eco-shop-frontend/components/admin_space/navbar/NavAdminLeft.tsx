"use client";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import Image from "next/image";
import { AiOutlineProduct } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { IoAnalytics, IoLogOutOutline } from "react-icons/io5";
import { MdAddCircle, MdClose, MdOutlineAddToPhotos } from "react-icons/md";
import imageLogo from "./../../../public/icon-logo/logo-icon.png";
import ItemLeftMenu from "./ItemLeftMenu";

function NavAdminLeft() {
  const viewLeftMenu = useAppSelector((state) => state.showLeftMenu.value);
  const dispatch = useAppDispatch();
  const onClickViewLeftMenu = () => {
    dispatch(showLeftMenuFct(false));
  };

  return (
    <div
      className={
        "h-full w-full lg:w-80 flex flex-col justify-between lg:justify-end bg-[rgba(0,0,0,0.8)] absolute lg:static z-10 backdrop-blur-lg overflow-hidden sm:block transition-translate duration-300 " +
        (viewLeftMenu == true
          ? "-translate-x-[0%]"
          : "-translate-x-[100%] lg:translate-x-[0%]")
      }
    >
      <div className="flex flex-row justify-between items-center p-3">
        <div className="w-fit flex flex-row items-center justify-center container gap-2">
          <div className="h-full w-fit container">
            <Image src={imageLogo} alt="image logo" height={32} width={32} />
          </div>
          <p className="text-white text-xl w-fit font-semibold">Eco-Shop-App</p>
        </div>
        <div
          className="text-xl cursor-pointer block lg:hidden"
          onClick={onClickViewLeftMenu}
        >
          <MdClose color="white" fontSize={30} />
        </div>
      </div>

      <div className="h-full flex flex-col text-white pt-10">
        <ItemLeftMenu
          title="Dashboard"
          path="/admin_space/dashboard"
          icon={<IoAnalytics className="text-xl" />}
        />
        <ItemLeftMenu
          title="Products"
          path="/admin_space/products/allProducts?page=1"
          icon={<AiOutlineProduct className="text-xl" />}
        />
        <ItemLeftMenu
          title="Add new product"
          path="/admin_space/addNewProduct"
          icon={<MdAddCircle className="text-xl" />}
        />
        <ItemLeftMenu
          title="Add category"
          path="/admin_space/addCategory"
          icon={<MdOutlineAddToPhotos className="text-xl" />}
        />

        <ItemLeftMenu
          title="Orders Details"
          path="/admin_space/orders"
          icon={<CgShoppingCart className="text-xl" />}
        />
        <ItemLeftMenu
          title="Admin Profile"
          path="/admin_space/admins"
          icon={<GrUserAdmin className="text-xl" />}
        />
        <ItemLeftMenu
          title="Logout"
          path="/admin_space/logout"
          icon={<IoLogOutOutline className="text-xl" />}
        />
      </div>
      <div className="absolute text-white bottom-0 w-full flex justify-center p-4">
        <p className="text-center">
          Reda Achouhad © CopyRights {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default NavAdminLeft;
