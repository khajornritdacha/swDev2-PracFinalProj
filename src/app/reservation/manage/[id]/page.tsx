import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import EditReservationForm from "@/components/EditReservationForm";
import RestaurantDetail from "@/components/RestaurantDetail";
import getRestaurant from "@/libs/getRestaurant";
import { getOneReservation } from "@/libs/reservation.service";
import { getServerSession } from "next-auth";

export default async function EditReservationPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user.token) return;
  const reservation = await getOneReservation(params.id, session?.user.token);
  const restaurant = await getRestaurant(reservation.data.restaurant._id);
  // TODO: handle fetch data and update data and toast on success
  return (
    <div className="flex flex-col sm:flex-row-reverse">
      <EditReservationForm reservationId={params.id} />
      <RestaurantDetail restaurant={restaurant.data} hideBookingButton={true} />
    </div>
  );
}
