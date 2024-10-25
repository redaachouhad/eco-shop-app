"use client";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import { Avatar, Badge } from "@mui/material";
import { CgMenuGridR } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

import { styled } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function NavBarTopClient() {
  const viewLeftMenu = useAppSelector((state) => state.showLeftMenu.value);
  const dispatch = useAppDispatch();
  const onClickViewLeftMenu = () => {
    dispatch(showLeftMenuFct(true));
  };
  const { data: session } = useSession();

  const [roleUser, setRoleUser] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");

  useEffect(() => {
    if ((session as any)?.accessToken) {
      const result_session = jwtDecode((session as any)?.accessToken as string);
      setRoleUser((session as any)?.roles);
      setGivenName((result_session as any)?.given_name as string);
      setFamilyName((result_session as any)?.family_name as string);
    }
  }, [(session as any)?.accessToken]);

  useEffect(() => {
    setRoleUser((session as any)?.roles);
  }, [session]);

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };
  return (
    <div className=" flex flex-row justify-end items-center px-4 sm:px-8 py-3 bg-[rgb(0,0,0,0.4)] gap-3 sm:gap-8 h-16">
      {/* Menu icon */}
      <div
        className="text-white text-3xl block sm:hidden"
        onClick={onClickViewLeftMenu}
      >
        <CgMenuGridR />
      </div>
      {/* Search */}
      <div className="flex flex-row items-center justify-between p-2 gap-2 w-full bg-[rgba(0,0,0,0.3)] rounded-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent outline-none text-white text-sm"
        />
        <div>
          <FaSearch color="white" className="text-sm" />
        </div>
      </div>

      {/*  */}
      <div className="flex flex-row items-center gap-2">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            src=""
            {...stringAvatar((session as any)?.user?.name)}
            className="border-2 border-white"
          />
        </StyledBadge>
        <div className="text-xs text-white hidden sm:flex sm:flex-col">
          <p className="font-semibold w-full flex flex-row gap-1 text-sm">
            {session?.user?.name}
          </p>
          <p className="font-light">{roleUser}</p>
        </div>
      </div>
    </div>
  );
}

export default NavBarTopClient;
