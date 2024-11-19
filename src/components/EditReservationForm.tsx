"use client";

import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useQuery } from "@tanstack/react-query";
import { getOneReservation } from "@/libs/reservation.service";
import { useSession } from "next-auth/react";

export default function EditReservationForm({
  reservationId,
}: {
  reservationId: string;
}) {
  const { data: session } = useSession();
  const [numOfGuests, setNumOfGuests] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);

  // TODO: handle loading
  const {} = useQuery({
    queryKey: ["reservation", "manage", reservationId],
    queryFn: async () => {
      if (!session?.user.token) return;
      const res = await getOneReservation(reservationId, session?.user.token);
      setNumOfGuests(res.data.numOfGuests);
      const day = dayjs(res.data.bookingDate);
      setBookingDate(day);
      return res;
    },
  });

  const email = "";
  const handleOnSubmit = async () => {
    console.log("Submit");
    console.log("numOfGuests: ", numOfGuests);
    console.log("bookingDate: ", bookingDate);
  };

  return (
    <ReservationForm
      email={email}
      numOfGuests={numOfGuests}
      setNumOfGuests={setNumOfGuests}
      bookingDate={bookingDate}
      setBookingDate={setBookingDate}
      handleOnSubmit={handleOnSubmit}
    />
  );

  //   print("Hello Jo Jo, I am mind eieiei ");
}
