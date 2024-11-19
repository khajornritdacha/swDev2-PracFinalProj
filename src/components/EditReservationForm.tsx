"use client";

import { Dayjs } from "dayjs";
import { useState } from "react";
import ReservationForm from "./ReservationForm";

export default function EditReservationForm() {
  const [numOfGuests, setNumOfGuests] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);

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
