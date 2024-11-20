import Image from "next/image";
import PinIcon from "/public/logo/pin.svg";
import RestaurantIcon from "/public/logo/restaurant.svg";
import { RestaurantDto } from "@/interface";

export default function ReservationRestaurantDetail({
  restaurant,
}: {
  restaurant: RestaurantDto;
}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 shadow-md rounded-3xl px-10 py-10 lg:max-w-[50%]">
        {/* Name Section */}
        <div className="w-auto h-auto px-16 py-1 border-b-4 border-[#EC0808] flex items-center justify-center">
          <div className="h-auto text-[36px] font-semibold text-black">
            {restaurant.name || "No name available"}
          </div>
        </div>

        {/* Details Bar and Page Breakout */}
        <div className="w-[80%] h-auto mx-10 py-1 border-b-2 border-[#999999] mb-4 border-opacity-30 flex items-center justify-center gap-10">
          <div className="h-auto flex items-center justify-center gap-1">
            <div className="w-[14px] h-[14px] relative">
              <Image
                src={RestaurantIcon}
                alt="Restaurant Icon"
                fill={true}
                className="object-contain"
              />
            </div>
            <p className="text-[16px] font-regular text-[#999999]">
              {restaurant.foodtype}
            </p>
          </div>

          <div className="h-auto flex items-center justify-center gap-1">
            <div className="w-[14px] h-[14px] relative">
              <Image
                src={PinIcon}
                alt="Pin Icon"
                fill={true}
                className="object-contain"
              />
            </div>
            <p className="text-[16px] font-regular text-[#999999]">
              {restaurant.province}
            </p>
          </div>
        </div>

        <div className="w-full relative max-w-[540px] min-w-[300px] aspect-[534/330] bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={restaurant.picture}
            alt="restaurnt picture"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        <div className="pt-8 text-center">
          <span className="font-bold">ที่อยู่ </span>
          <span className="break-words whitespace-normal">
            {restaurant.address} {restaurant.postalcode}
          </span>
        </div>
      </div>
    </>
  );
}
