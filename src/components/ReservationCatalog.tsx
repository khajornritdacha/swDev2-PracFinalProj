"use client";

import { Role } from "@/next-auth";
import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ReservationCard from "./ReservationCard";
import { getReservations } from "@/libs/reservation.service";

export default function ReservationCatalog({
  token,
  role,
  email,
}: {
  token: string;
  role: Role;
  email: string;
}) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: async () => await getReservations(token),
    queryKey: ["getReservations"],
  });
  if (isLoading) return <LinearProgress />;
  if (isError) return <div>error</div>;

  const reservations = data?.data || [];

  return (
    <>
      {reservations.map((reservation) => (
        <ReservationCard
          key={`${reservation._id}`}
          reservation={reservation}
          role={role}
          email={email}
          refetch={refetch}
        />
      ))}
    </>
  );
}
