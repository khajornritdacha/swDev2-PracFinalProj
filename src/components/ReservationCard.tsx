"use client";
import Image from "next/image";
import StyledButton from "./StyledButton";

import Calendar from "@/app/icons/Calendar.svg";
import Person from "@/app/icons/Person.svg";
import Clock from "@/app/icons/Clock.svg";
import { GetReservationDto, GetReservationJson } from "@/interface";
import { Role } from "@/next-auth";
import Link from "next/link";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { deleteReservation } from "@/libs/reservation.service";
import { useSession } from "next-auth/react";

const parseBookingDate = (bookingDate: string) => {
  const date = new Date(bookingDate);
  return {
    date: date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export default function ReservationCard({
  reservation,
  role,
  email,
  refetch,
}: {
  reservation: GetReservationDto;
  role: Role;
  email: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<GetReservationJson, Error>>;
}) {
  const { data: session } = useSession();
  const dateTime = parseBookingDate(reservation.bookingDate);
  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      console.log("In mutation with id: ", id);
      if (!session?.user.token) return;
      const res = await deleteReservation(id, session?.user.token);
      return res;
    },
    onSuccess: () => {
      // TODO: add toaster
      refetch();
    },
  });

  // TODO: open modal and confirm delete with react query mutate

  const isAdmin = role === "admin";

  return (
    <div className="flex flex-col  items-center gap-4 px-4 py-4 w-[80%] rounded-2xl shadow-md hover:bg-slate-100 transition-colors hover:cursor-pointer sm:flex-row">
      <div className="flex w-full">
        <div className="flex-col">
          <h3 className="text-xl font-bold">{reservation.restaurant.name}</h3>
          <span
            className={`font-light text-gray text-nowrap ${
              isAdmin && "text-sm"
            }`}
          >
            {isAdmin
              ? `ไอดีผู้จอง: ${reservation.user}`
              : `อีเมลผู้จอง: ${email}`}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center px-3 gap-5 text-gray w-full">
        <div className="flex justify-center items-center gap-2 min-w-max">
          <Image src={Calendar} alt="Calender" width={20} height={20} />
          <span className="">{dateTime.date}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image src={Clock} alt="Clock" width={20} height={20} />
          <span className="">{dateTime.time}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image src={Person} alt="Person" width={20} height={20} />
          <span className="">{reservation.numOfGuests}</span>
        </div>
      </div>
      <div className="flex items-center justify-around w-full">
        <StyledButton variant="secondary">
          <Link href={`/reservation/manage/${reservation._id}`}>
            แก้ไขข้อมูล
          </Link>
        </StyledButton>
        <StyledButton
          handleOnClick={() => mutationDelete.mutate(reservation._id)}
        >
          ยกเลิกการจอง
        </StyledButton>
      </div>
    </div>
  );
}
