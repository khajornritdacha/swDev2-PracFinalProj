"use client";
import EditReservationForm from "@/components/EditReservationForm";
import ReservationRestaurantDetail from "@/components/ReservationRestaurantDetail";
import { RestaurantDto } from "@/interface";
import getRestaurant from "@/libs/getRestaurant";
import { getOneReservation } from "@/libs/reservation.service";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EditReservationPage({
  params,
}: {
  params: { id: string };
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
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const fetchReservation = async () => {
      try {
        const reservation = await getOneReservation(
          params.id,
          session.user.token
        );
        const res = await getRestaurant(reservation.data.restaurant._id);
        setRestaurant(res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          return <div>Reservation not found!</div>;
        }
        console.error(err);
      }
    };
    fetchReservation();
  }, [session, params.id]);

  // TODO: handle fetch data and update data and toast on success
  return (
    <div className="flex items-center py-10 px-[12%] gap-10 flex-col lg:py-0 lg:flex-row-reverse lg:h-[calc(100vh-80px)] lg:min-w-full lg:justify-around">
      <div>
        <h2 className="text-center font-bold text-3xl">รายละเอียดการจอง</h2>
        <EditReservationForm reservationId={params.id} />
      </div>
      {!restaurant ? (
        <div>Loading...</div>
      ) : (
        <ReservationRestaurantDetail restaurant={restaurant} />
      )}
    </div>
  );
}
