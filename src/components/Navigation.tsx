import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

// TODO: create signout page
export default async function Navigation() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <div className="flex justify-between w-full">
        <Link href="/reservation/manage">My Reservation</Link>
        {session?.user ? (
          <Link href="/api/auth/signout">Sign out </Link>
        ) : (
          <Link href="/auth/signin">Sign in</Link>
        )}
      </div>
    </>
  );
}
