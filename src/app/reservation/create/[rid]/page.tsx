"use client";
import CreateReservationForm from "@/components/CreateReservationForm";
import ReservationRestaurantDetail from "@/components/ReservationRestaurantDetail";
import { RestaurantDto } from "@/interface";
import getRestaurant from "@/libs/getRestaurant";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function CreateReservationPage({
  params,
}: {
  params: { rid: string };
}) {
  const [restaurant, setRestaurant] = useState<RestaurantDto>({
    _id: "",
    name: "loading",
    address: "loading...",
    province: "loading...",
    foodtype: "loading...",
    picture: "",
    postalcode: "",
    tel: "0000000000",
  });

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await getRestaurant(params.rid);
        setRestaurant(res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          return <div>Reservation not found!</div>;
        }
        console.error(err);
      }
    };
    fetchReservation();
  }, [params.rid]);

  return (
    <div className="flex items-center py-10 px-[12%] gap-10 flex-col lg:py-0 lg:flex-row-reverse lg:h-[calc(100vh-80px)] lg:min-w-full lg:justify-around">
      <div>
        <h2 className="text-center font-bold text-3xl">รายละเอียดการจอง</h2>
        <CreateReservationForm restaurant_id={params.rid} />
      </div>
      <ReservationRestaurantDetail restaurant={restaurant} />
    </div>
  );
}
