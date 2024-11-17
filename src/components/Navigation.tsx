"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Hamburger from "./Hamburger";
import SignoutButton from "./SignoutButton";
import StyledButton from "./StyledButton";

// TODO: create signout page
export default function Navigation() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <>
      <div className="flex justify-between w-full items-center px-8 py-3 shadow-md font-medium font-sans sm:px-20">
        <div className="flex items-center">
          <Link href="/reservation/manage">ร้านอาหารทั้งหมด</Link>
        </div>
        <Hamburger isLoggedIn={isLoggedIn} />
        <div className="hidden sm:inline-block">
          <ul className="flex justify-between items-center gap-14">
            <li>
              <Link href="/reservation/manage">ร้านอาหารทั้งหมด</Link>
            </li>
            <li>
              <Link href="/reservation/manage">การจองของฉัน</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <SignoutButton />
              ) : (
                <StyledButton>
                  <Link href="/auth/signin"> เข้าสู่ระบบ</Link>
                </StyledButton>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
