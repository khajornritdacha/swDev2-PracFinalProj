import Image from "next/image";
import StyledButton from "./StyledButton";

export default function ReservationCard() {
  // TODO: change email to a prop
  const email = "john@email.com";
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-4 w-[80%] shadow-md sm:flex-row">
      <div className="flex w-full">
        <Image src="" alt="" />
        <div className="flex-col">
          <h3 className="text-lg font-bold">ชื่อร้านอาหาร</h3>
          <span className="font-light text-gray">อีเมลผู้จอง: {email}</span>
        </div>
      </div>
      <div className="flex justify-between items-center px-3 gap-5 text-gray w-full">
        <div className="">1 Oct 2024</div>
        <div>11.15</div>
        <div>4</div>
      </div>
      <div className="flex items-center justify-around w-full">
        <StyledButton>ยกเลิกการจอง</StyledButton>
        <StyledButton>ยกเลิกการจอง</StyledButton>
      </div>
    </div>
  );
}
