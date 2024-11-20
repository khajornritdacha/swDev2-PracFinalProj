import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import EditReservationForm from "@/components/EditReservationForm";
import ReservationRestaurantDetail from "@/components/ReservationRestaurantDetail";
import getRestaurant from "@/libs/getRestaurant";
import { getOneReservation } from "@/libs/reservation.service";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";

export default async function EditReservationPage({
  params,
}: {
  params: { id: string };
}) {
  let restaurant = null;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.token) return;
    const reservation = await getOneReservation(params.id, session?.user.token);
    restaurant = await getRestaurant(reservation.data.restaurant._id);
  } catch (err) {
    if (err instanceof AxiosError) {
      return <div>Reservation not found!</div>;
    }
    console.error(err);
  }

  if (!restaurant) {
    return <div>Restaurant not found!</div>;
  }

  // TODO: handle fetch data and update data and toast on success
  return (
    <div className="flex items-center py-10 px-[12%] gap-10 flex-col lg:py-0 lg:flex-row-reverse lg:h-[calc(100vh-80px)] lg:min-w-full lg:justify-around">
      <div>
        <h2 className="text-center font-bold text-3xl">รายละเอียดการจอง</h2>
        <EditReservationForm reservationId={params.id} />
      </div>
      <ReservationRestaurantDetail restaurant={restaurant.data} />
    </div>
  );
}
