"use client";

import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import { Avatar, Badge, styled } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

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

function NavBarTop() {
  const viewLeftMenu = useAppSelector((state) => state.showLeftMenu.value);
  const dispatch = useAppDispatch();
  const [roleUser, setRoleUser] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const onClickViewLeftMenu = () => {
    dispatch(showLeftMenuFct(true));
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const result_session = jwtDecode((session as any)?.accessToken as string);
      setRoleUser((session as any)?.roles);
      setGivenName((result_session as any)?.given_name as string);
      setFamilyName((result_session as any)?.family_name as string);
    }
  }, [session]);

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: deepOrange[500],
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <div className=" flex flex-row justify-between items-center px-4 sm:px-8 py-3 bg-[rgb(0,0,0,0.4)] gap-4 lg:gap-8">
      {/* Menu icon */}
      <div className="text-white text-3xl" onClick={onClickViewLeftMenu}>
        <CgMenuGridR className="block lg:hidden" />
      </div>
      {/* Search */}
      <div className="flex flex-row items-center justify-between p-2 gap-2 w-full bg-[rgba(255,255,255,0.15)] rounded-md">
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
      {session?.user && (
        <div className="flex flex-row items-center gap-2">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              {...stringAvatar(givenName + " " + familyName)}
              className="border-2 border-white"
            />
          </StyledBadge>
          <div className="text-xs text-white hidden sm:flex sm:flex-col">
            <p className="font-semibold w-full flex flex-row gap-1 text-sm">
              <span>{givenName}</span>
              <span>{familyName}</span>
            </p>
            <p className="font-light text-sm">{roleUser}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBarTop;
