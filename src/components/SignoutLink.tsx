"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SignOutLink() {
  const handleSignOut = async () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <Link href="#" onClick={handleSignOut}>
      ออกจากระบบ
    </Link>
  );
}
