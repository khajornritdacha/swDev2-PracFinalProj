"use client";

import { Dayjs } from "dayjs";
import { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { createReservation } from "@/libs/reservation.service";

export default function CreateReservationForm({
  restaurant_id,
}: {
  restaurant_id: string;
}) {
  const { data: session } = useSession();
  const email = session?.user.email || "";
  const [numOfGuests, setNumOfGuests] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);

  const createMutation = useMutation({
    mutationFn: async () => {
      // TODO: handle error
      //   TODO: toaster for success
      if (!session?.user.token) return;
      if (!bookingDate) return;
      const createdAt = new Date();
      const res = await createReservation(
        {
          numOfGuests,
          bookingDate: bookingDate.toISOString(),
          createdAt: createdAt.toISOString(),
        },
        session?.user.token,
        restaurant_id
      );
      return res;
    },
    onSuccess: () => {
      setNumOfGuests(0);
      setBookingDate(null);
    },
  });

  return (
    <ReservationForm
      email={email}
      numOfGuests={numOfGuests}
      setNumOfGuests={setNumOfGuests}
      bookingDate={bookingDate}
      setBookingDate={setBookingDate}
      handleOnSubmit={() => createMutation.mutate()}
      isAdmin={false}
    />
  );

  //   print("Hello Jo Jo, I am mind eieiei ");
}
