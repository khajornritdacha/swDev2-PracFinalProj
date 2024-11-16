"use client";

import { useSession } from "next-auth/react";

export default function HelloPage() {
  const { data: session } = useSession();
  return <div>Hello</div>;
}
