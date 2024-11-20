"use client";

import { editReservation, getOneReservation } from "@/libs/reservation.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import { GetReservationDto } from "@/interface";

export default function EditReservationForm({
  reservationId,
}: {
  reservationId: string;
}) {
  const { data: session } = useSession();
  const [numOfGuests, setNumOfGuests] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [reservation, setReservation] = useState<GetReservationDto | null>(
    null
  );

  const isAdmin = session?.user.role === "admin";
  // TODO: handle loading
  const { isLoading } = useQuery({
    queryKey: ["reservation", "manage", reservationId],
    queryFn: async () => {
      if (!session?.user.token) return;
      const res = await getOneReservation(reservationId, session?.user.token);
      setNumOfGuests(res.data.numOfGuests);
      const day = dayjs(res.data.bookingDate);
      setBookingDate(day);
      setReservation(res.data);
      return res;
    },
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user.token) return;
      if (!bookingDate) return;
      if (!reservation) return;
      const res = await editReservation(
        {
          numOfGuests,
          bookingDate: bookingDate.toISOString(),
          createdAt: reservation.createdAt,
        },
        session?.user.token,
        reservationId
      );
      setReservation(res.data);
      return res;
    },
    onSuccess: () => {
      // TODO: toast success
      window.alert("Edit reservation success!");
    },
  });

  const email = (isAdmin ? reservation?.user : session?.user.email) || "";

  return (
    <ReservationForm
      email={email}
      numOfGuests={numOfGuests}
      setNumOfGuests={setNumOfGuests}
      bookingDate={bookingDate}
      setBookingDate={setBookingDate}
      handleOnSubmit={() => editMutation.mutate()}
      isAdmin={isAdmin}
      isLoading={isLoading || editMutation.isPending}
    />
  );
}
