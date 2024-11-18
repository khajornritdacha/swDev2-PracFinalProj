import ReservationCatalog from "@/components/ReservationCatalog";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ReservationPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return (
    <div className="flex items-center flex-col">
      <h1 className="text-4xl sm:text-5xl font-bold text-center py-8 ">
        ประวัติการจอง
      </h1>
      <ReservationCatalog
        token={session.user.token}
        role={session.user.role}
        email={session.user.email}
      />
    </div>
  );
}
