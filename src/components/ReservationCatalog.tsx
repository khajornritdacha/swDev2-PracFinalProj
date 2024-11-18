"use client";

import getReservations from "@/libs/getReservations";
import { Role } from "@/next-auth";
import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ReservationCard from "./ReservationCard";

// TODO: change to use real data
export default function ReservationCatalog({
  token,
  role,
  email,
}: {
  token: string;
  role: Role;
  email: string;
}) {
  console.log(`token: ${token}`);
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getReservations(token),
    queryKey: ["getReservations"],
  });
  if (isLoading) return <LinearProgress />;
  if (isError) return <div>error</div>;

  const reservations = data?.data || [];

  // const reservations = await reservationDto
  // const reservations = [
  //   {
  //     bookingDate: "2024-10-01",
  //     numOfGuests: 4,
  //     user: "Joe",
  //     restaurant: "KFC",
  //     createdAt: "2024-09-01",
  //   },
  //   {
  //     bookingDate: "2024-10-01",
  //     numOfGuests: 4,
  //     user: "Joe",
  //     restaurant: "KFC",
  //     createdAt: "2024-09-01",
  //   },
  //   {
  //     bookingDate: "2024-10-01",
  //     numOfGuests: 4,
  //     user: "Joe",
  //     restaurant: "KFC",
  //     createdAt: "2024-09-01",
  //   },
  // ];

  console.log(reservations);
  return (
    <>
      {reservations.map((reservation) => (
        <ReservationCard
          key={`${reservation._id}`}
          reservation={reservation}
          role={role}
          email={email}
        />
      ))}
    </>
  );
}
