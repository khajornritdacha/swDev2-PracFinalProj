import Image from "next/image";
import StyledButton from "./StyledButton";

import Calendar from "@/app/icons/Calendar.svg";
import Person from "@/app/icons/Person.svg";
import Clock from "@/app/icons/Clock.svg";
import { ReservationDto } from "@/interface";

export default function ReservationCard({
  reservation,
}: {
  reservation: ReservationDto;
}) {
  const bookingDate = new Date(reservation.bookingDate).toLocaleDateString(
    "th-TH",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const bookingTime = new Date(reservation.bookingDate).toLocaleTimeString(
    "th-TH",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-4 w-[80%] rounded-2xl shadow-md hover:bg-slate-100 transition-colors hover:cursor-pointer sm:flex-row">
      <div className="flex w-full">
        <div className="flex-col">
          <h3 className="text-xl font-bold">{reservation.restaurant}</h3>
          <span className="font-light text-gray">
            ชื่อผู้จอง: {reservation.user}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center px-3 gap-5 text-gray w-full">
        <div className="flex justify-center items-center gap-2">
          <Image src={Calendar} alt="Calender" width={20} height={20} />
          <span className="">{bookingDate}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image src={Clock} alt="Clock" width={20} height={20} />
          <span className="">{bookingTime}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image src={Person} alt="Person" width={20} height={20} />
          <span className="">{reservation.numOfGuests}</span>
        </div>
      </div>
      <div className="flex items-center justify-around w-full">
        <StyledButton variant="secondary">แก้ไขข้อมูล</StyledButton>
        <StyledButton>ยกเลิกการจอง</StyledButton>
      </div>
    </div>
  );
}
