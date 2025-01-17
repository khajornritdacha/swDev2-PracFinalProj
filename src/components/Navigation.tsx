"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Hamburger from "./Hamburger";
import SignoutButton from "./SignoutButton";
import StyledButton from "./StyledButton";
import Logo from "/public/logo/logo.png";
import Image from "next/image";

export default function Navigation() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <>
      <div className="h-[80px] flex justify-between w-full items-center px-8 py-3 shadow-md font-medium sm:px-20">
        <div className="flex items-center">
          <Link href="/restaurant">
            <Image src={Logo} alt="web logo" width={65} height={65} priority />
          </Link>
        </div>
        <Hamburger isLoggedIn={isLoggedIn} />
        <div className="hidden md:inline-block">
          <ul className="flex justify-between items-center gap-14">
            <li>
              <Link href="/restaurant">ร้านอาหารทั้งหมด</Link>
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
