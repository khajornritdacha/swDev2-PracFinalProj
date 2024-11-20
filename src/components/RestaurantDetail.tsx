import Image from "next/image";
import Link from "next/link";
import PinIcon from "@/../public/logo/pin.svg";
import RestaurantIcon from "@/../public/logo/restaurant.svg";

type RestaurantProps = {
  restaurant: {
    _id?: string;
    name: string;
    foodtype: string;
    address: string;
    province: string;
    postalcode: string;
    tel: string;
    picture: string;
  };
  hideBookingButton?: boolean;
};

const RestaurantDetail = ({
  restaurant,
  hideBookingButton,
}: RestaurantProps) => {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center gap-4">
        {/* Name Section */}
        <div className="w-auto h-auto px-16 py-1 border-b-4 border-[#EC0808] flex items-center justify-center">
          <div className="h-auto text-[36px] font-semibold text-black">
            {restaurant.name || "No name available"}
          </div>
        </div>

        {/* Details Bar and Page Breakout */}
        <div className="w-[80%] h-auto mx-10 py-1 border-b-2 border-[#999999] mb-4 border-opacity-30 flex items-center justify-center gap-10">
          <div className="h-auto flex items-center justify-center gap-1">
            <div className="w-[14px] h-[14px] flex">
            <img
              src="/logo/restaurant.svg"
              alt="restaurant icon"
              className="w-full h-full object-contain"
            />

            </div>
            <p className="text-[16px] font-regular text-[#999999]">
              {restaurant.foodtype}
            </p>
          </div>

          <div className="h-auto flex items-center justify-center gap-1">
            <div className="w-[14px] h-[14px] flex">
              {/* <Image
                src={PinIcon}
                alt="Pin Icon"
                fill={true}
                className="object-contain"
              /> */}
              <img
              src="/logo/pin.svg"
              alt="restaurant pic"
              className="w-full h-full object-contain"
            />
            </div>
            <p className="text-[16px] font-regular text-[#999999]">
              {restaurant.province}
            </p>
          </div>
        </div>

        {/* Wrap Picture and Details Box */}
        <div className="w-full flex flex-wrap gap-8 px-[5%] justify-center">
          <div className="w-full max-w-[540px] min-w-[300px] aspect-[534/330] bg-gray-200 rounded-[50px] overflow-hidden shadow-lg">
            <img
              src={restaurant.picture}
              alt="restaurant pic"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="w-full max-w-[540px] min-w-[300px] aspect-[534/330]
                                bg-white rounded-[16px] p-4 shadow-md
                                flex flex-col items-center justify-center gap-8"
          >
            <div className="w-auto h-auto px-4 py-1 border-b-4 border-[#EC0808] flex items-center justify-center">
              <div className="h-auto text-[32px] font-semibold text-black">
                {restaurant.name || "No name available"}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-auto text-black px-10 text-[20px] font-medium flex flex-col gap-4 items-start justify-center">
                <div className="flex gap-2">
                  <span className="font-bold">Address</span>
                  <div className="inline-flex">{restaurant.address}</div>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">Cuisine</span>
                  <div>{restaurant.foodtype}</div>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">Tel.</span>
                  <div>{restaurant.tel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!hideBookingButton && (
          <div
            className="h-[15%] w-[70%]
                        bg-white rounded-[16px] p-4 shadow-lg
                        flex flex-col items-center justify-center gap-3 m-5"
          >
            <div className="text-[24px] font-bold">Click to Book</div>
            <div className="h-auto w-full flex justify-center">
              <hr
                style={{
                  all: "unset",
                  width: "80%",
                  height: "2px",
                  backgroundColor: "#999999",
                  borderRadius: "8px",
                  opacity: "50%",
                }}
              />
            </div>

            <Link
              href={`/reservation/create/${restaurant._id}`}
              className="w-[50%] h-[60px] bg-[#EC0808] text-center rounded-[24px] text-[24px] text-white font-extrabold flex justify-center items-center"
            >
              BOOK NOW
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantDetail;
