"use client";

import { Dayjs } from "dayjs";
import { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { createReservation } from "@/libs/reservation.service";
import { AxiosError } from "axios";

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
      setNumOfGuests(0);
      setBookingDate(null);
      window.alert("Create Success!");
      return res;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        window.alert(error?.response?.data.message);
        return;
      }
      console.error(error);
      window.alert(error.message);
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
      isLoading={createMutation.isPending}
    />
  );
}
