"use client";

import { FormControl, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import StyledButton from "./StyledButton";

interface ReservationFormProps {
  email: string;
  numOfGuests: number;
  setNumOfGuests: (numOfGuests: number) => void;
  bookingDate: dayjs.Dayjs | null;
  setBookingDate: (bookingDate: dayjs.Dayjs | null) => void;
  handleOnSubmit: () => void;
  isAdmin: boolean;
}

export default function ReservationForm({
  email,
  numOfGuests,
  setNumOfGuests,
  bookingDate,
  setBookingDate,
  handleOnSubmit,
  isAdmin,
}: ReservationFormProps) {
  return (
    <FormControl className="flex flex-col gap-6 w-auto py-10 px-10 shadow-md rounded-3xl h-min">
      <div className="flex justify-between gap-5">
        <label className="block sm:min-w-max" htmlFor="email">
          {isAdmin ? "ไอดีผู้จอง" : "อีเมลผู้จอง"}
        </label>
        <TextField
          id="email"
          label={isAdmin ? "user_id" : "email"}
          variant="outlined"
          placeholder="john@email.com"
          type="email"
          disabled={true}
          value={email}
        />
      </div>
      <div className="flex justify-between gap-5">
        <label className="sm:min-w-max" htmlFor="numOfGuests">
          จำนวนผู้จอง
        </label>
        <TextField
          id="numOfGuests"
          label="จำนวนผู้จอง"
          variant="outlined"
          placeholder="0"
          type="number"
          value={numOfGuests}
          onChange={(e) => {
            const num = Number(e.target.value);
            if (num < 0) return;
            setNumOfGuests(num);
          }}
        />
      </div>
      <div className="flex justify-between gap-5">
        <label className="sm:min-w-max" htmlFor="email">
          วันที่และเวลา
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={bookingDate}
            onChange={(value) => setBookingDate(value)}
          />
        </LocalizationProvider>
      </div>
      <StyledButton handleOnClick={() => handleOnSubmit()}>
        ยืนยันการจอง
      </StyledButton>
    </FormControl>
  );
}
