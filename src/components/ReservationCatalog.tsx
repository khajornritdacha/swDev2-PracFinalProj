"use client";

import getReservations from "@/libs/getReservations";
import { useQuery } from "@tanstack/react-query";
import ReservationCard from "./ReservationCard";
import { LinearProgress } from "@mui/material";

// TODO: change to use real data
export default function ReservationCatalog({ token }: { token: string }) {
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
        <ReservationCard key={`${reservation._id}`} reservation={reservation} />
      ))}
    </>
  );
}
