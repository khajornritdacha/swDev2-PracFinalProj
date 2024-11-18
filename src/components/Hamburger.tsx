"use client";
import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import SignOutLink from "./SignoutLink";

export default function Hamburger({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/reservation/manage">ร้านอาหารทั้งหมด</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/reservation/manage">การจองของฉัน</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {isLoggedIn ? (
            <SignOutLink />
          ) : (
            <Link href="/auth/signin"> เข้าสู่ระบบ</Link>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
}
