import { getServerSession } from "next-auth";
import SignInForm from "./form";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/reservation/manage");
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
      <SignInForm csrfToken={""} />
    </div>
  );
}
