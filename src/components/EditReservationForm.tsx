"use client";

import { editReservation, getOneReservation } from "@/libs/reservation.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ReservationForm from "./ReservationForm";

export default function EditReservationForm({
  reservationId,
}: {
  reservationId: string;
}) {
  const { data: session } = useSession();
  const [numOfGuests, setNumOfGuests] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  let createdAt = "";
  // TODO: handle loading
  const {} = useQuery({
    queryKey: ["reservation", "manage", reservationId],
    queryFn: async () => {
      if (!session?.user.token) return;
      const res = await getOneReservation(reservationId, session?.user.token);
      setNumOfGuests(res.data.numOfGuests);
      const day = dayjs(res.data.bookingDate);
      setBookingDate(day);
      createdAt = res.data.createdAt;
      return res;
    },
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user.token) return;
      if (!bookingDate) return;
      const res = await editReservation(
        {
          numOfGuests,
          bookingDate: bookingDate.toISOString(),
          createdAt,
        },
        session?.user.token,
        reservationId
      );
      return res;
    },
    onSuccess: () => {},
  });

  const email = session?.user.email || "";

  return (
    <ReservationForm
      email={email}
      numOfGuests={numOfGuests}
      setNumOfGuests={setNumOfGuests}
      bookingDate={bookingDate}
      setBookingDate={setBookingDate}
      handleOnSubmit={() => editMutation.mutate()}
    />
  );
}
