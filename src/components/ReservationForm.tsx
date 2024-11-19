"use client";

import { FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StyledButton from "./StyledButton";
import dayjs, { Dayjs } from "dayjs";

interface ReservationFormProps {
  email: string;
  numOfGuests: number;
  setNumOfGuests: (numOfGuests: number) => void;
  bookingDate: dayjs.Dayjs | null;
  setBookingDate: (bookingDate: dayjs.Dayjs | null) => void;
  handleOnSubmit: () => void;
  isAdmin: boolean;
}

// TODO: change if admin
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
    <FormControl className="flex flex-col gap-6 w-full">
      <div className="flex justify-between">
        <label className="block" htmlFor="email">
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
      <div className="flex justify-between">
        <label htmlFor="numOfGuests">จำนวนผู้จอง</label>
        <TextField
          id="numOfGuests"
          label="numOfGuests"
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
      <div className="flex justify-between">
        <label htmlFor="email">วันที่และเวลา</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
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
