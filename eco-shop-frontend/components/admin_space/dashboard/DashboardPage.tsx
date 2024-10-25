"use client";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FaCartArrowDown, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoLogoLinkedin, IoLogoYoutube, IoPeople } from "react-icons/io5";
import CardDashboard from "./CardDashboard";
import ChartBlock from "./ChartBlock";
import ChartBlockBar from "./ChartBlockBar";

function DashboardPage() {
  const years = Array.from({ length: 201 }, (_, index) => 1900 + index);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
    }
  }, [(session as any)?.accessToken]);
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
        <CardDashboard
          title="Revenue"
          number1="24000"
          number2="125 $ "
          state={true}
          icon={<HiOutlineCurrencyDollar fontSize={30} />}
        />
        <CardDashboard
          title="Total customers"
          number1="24000"
          number2="125 users"
          state={true}
          icon={<IoPeople fontSize={30} />}
        />
        <CardDashboard
          title="Total orders"
          number1="24000"
          number2="125 orders "
          state={true}
          icon={<FaCartArrowDown fontSize={30} />}
        />
        <CardDashboard
          title="Comments"
          number1="24000"
          number2="125"
          state={true}
          icon={<HiOutlineCurrencyDollar fontSize={30} />}
        />
      </div>

      <div className="w-full  grid grid-cols-1 md:grid-cols-2   gap-4">
        <ChartBlock title="Sale Overview" />
        <ChartBlock title="Incomes" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
        <div className="flex flex-col bg-[rgba(0,0,0,0.3)] justify-center items-center p-2 gap-2 rounded-lg">
          <div className="bg-[rgba(255,255,255,0.2)] p-1.5 rounded-md">
            <FaFacebook fontSize={30} />
          </div>
          <p className="text-2xl font-semibold">84K</p>
          <p className="text-sm">Facebook Users</p>
        </div>
        <div className="flex flex-col bg-[rgba(0,0,0,0.3)] justify-center items-center p-2 gap-2 rounded-lg">
          <div className="bg-[rgba(255,255,255,0.2)] p-1.5 rounded-md">
            <IoLogoYoutube fontSize={30} />
          </div>
          <p className="text-2xl font-semibold">84K</p>
          <p className="text-sm">Facebook Users</p>
        </div>
        <div className="flex flex-col bg-[rgba(0,0,0,0.3)] justify-center items-center p-2 gap-2 rounded-lg">
          <div className="bg-[rgba(255,255,255,0.2)] p-1.5 rounded-md">
            <FaSquareXTwitter fontSize={30} />
          </div>
          <p className="text-2xl font-semibold">84K</p>
          <p className="text-sm">Facebook Users</p>
        </div>
        <div className="flex flex-col bg-[rgba(0,0,0,0.3)] justify-center items-center p-2 gap-2 rounded-lg">
          <div className="bg-[rgba(255,255,255,0.2)] p-1.5 rounded-md">
            <IoLogoLinkedin fontSize={30} />
          </div>
          <p className="text-2xl font-semibold">84K</p>
          <p className="text-sm">Facebook Users</p>
        </div>
      </div>
      <div className="w-full  grid grid-cols-1 md:grid-cols-2   gap-4">
        <ChartBlock title="Total Users" />
        <ChartBlockBar title="Age customers" />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
        <div className="flex flex-col bg-[rgba(0,0,0,0.3)] justify-center items-center p-2 gap-2 rounded-lg">
          <div className="bg-[rgba(255,255,255,0.2)] p-1.5 rounded-md">
            <FaFacebook fontSize={30} />
          </div>
          <p className="text-2xl font-semibold">84K</p>
          <p className="text-sm">Facebook Users</p>
        </div>
      </div> */}
    </div>
  );
}

export default DashboardPage;
