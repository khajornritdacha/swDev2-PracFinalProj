"use client";

import { signOut } from "next-auth/react";
import StyledButton from "./StyledButton";

export default function SignoutButton() {
  const handleSignOut = async () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <StyledButton handleOnClick={() => handleSignOut()}>
      ออกจากระบบ
    </StyledButton>
  );
}
