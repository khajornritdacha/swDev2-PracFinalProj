import Image from "next/image";
import Link from "next/link";
import { RestaurantItem } from "../../interface";
import MapIcon from "../../public/logo/map.svg";

interface CardProps {
  restaurant: RestaurantItem;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url); // Throws an error if the URL is invalid
    return true;
  } catch {
    return false;
  }
};

const RestaurantCard = ({ restaurant }: CardProps) => {
  const { _id, name, picture, foodtype, province } = restaurant;

  const isValidPicture = isValidUrl(picture);

  return (
    <>
      <div className="w-full h-[177px] shadow-custom-md rounded-[15px] flex justify-center gap-8 p-6">
        {/* Left Section */}
        <div className="h-full aspect-square relative">
          {isValidPicture ? (
            <Image
              src={picture}
              alt={picture}
              fill={true}
              className="w-full h-full rounded-[6px] shadow-inner object-cover"
            />
          ) : null}
        </div>

        {/* Right Section */}
        <div className="w-full h-full flex-1 flex flex-col items-start justify-cente relative">
          {/* upper Section */}
          <div className="flex flex-col items-start justify-center">
            <p className="text-[16px] font-light text-gray-700">{foodtype}</p>
            <p className="text-[24px] font-semibold leading-[150%] text-gray-900">
              {name}
            </p>
          </div>

          {/* below Section */}
          <div className="flex-1 h-[35px] flex items-center justify-center gap-6 py-3 overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 relative">
                <Image
                  src={MapIcon}
                  alt="map icon"
                  fill={true}
                  className="object-contain"
                />
              </div>
              <p className="text-[16px] font-regular text-gray-700">
                {province}
              </p>
            </div>
          </div>

          {/* Detail Button */}
          <Link key={_id} href={`/restaurant/${_id}`}>
            <button className="w-[108px] p-[5px] flex items-center justify-center bg-[#EC0808] text-white text-[16px] font-extrabold rounded-full">
              Details
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
