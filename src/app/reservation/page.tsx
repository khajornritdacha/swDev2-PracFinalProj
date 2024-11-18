import ReservationCatalog from "@/components/ReservationCatalog";
import { ReservationDto } from "@/interface";
import getReservations from "@/libs/getReservations";
import { LinearProgress } from "@mui/material";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ReservationPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) return null;
  const reservations: Promise<ReservationDto[]> = getReservations(
    session?.user.token
  );
  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-8 font-sans">
        ประวัติการจอง
      </h1>
      <Suspense
        fallback={
          <div>
            Loading...
            <LinearProgress />
          </div>
        }
      >
        <ReservationCatalog reservationDto={reservations} />
      </Suspense>
    </div>
  );
}
