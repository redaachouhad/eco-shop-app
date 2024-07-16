import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import Image from "next/image";
import { AiOutlineProduct } from "react-icons/ai";
import { FaCartPlus, FaUser } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import imageLogo from "./../../../public/icon-logo/logo-icon.png";
import ItemLeftMenuClient from "./ItemLeftMenuClient";

function NavAdminLeftClient() {
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
        <ItemLeftMenuClient
          title="Products"
          path="/client_space/products/allProducts?page=1"
          icon={<AiOutlineProduct className="text-xl" />}
        />

        <ItemLeftMenuClient
          title="Your Orders"
          path="/client_space/orders"
          icon={<FaListCheck className="text-xl" />}
        />
        <ItemLeftMenuClient
          title="Cart"
          path="/client_space/cart"
          icon={<FaCartPlus color="white" className="text-xl" />}
        />
        <ItemLeftMenuClient
          title="User Profile"
          path="/client_space/userProfile"
          icon={<FaUser className="text-xl" />}
        />

        <ItemLeftMenuClient
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

export default NavAdminLeftClient;
