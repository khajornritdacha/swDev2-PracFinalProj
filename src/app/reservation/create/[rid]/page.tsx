import CreateReservationForm from "@/components/CreateReservationForm";
import ReservationRestaurantDetail from "@/components/ReservationRestaurantDetail";
import getRestaurant from "@/libs/getRestaurant";

export default async function CreateReservationPage({
  params,
}: {
  params: { rid: string };
}) {
  const restaurant = await getRestaurant(params.rid);
  return (
    <div className="flex items-center py-10 px-[12%] gap-10 flex-col lg:py-0 lg:flex-row-reverse lg:h-[calc(100vh-80px)] lg:min-w-full lg:justify-around">
      <div>
        <h2 className="text-center font-bold text-3xl">รายละเอียดการจอง</h2>
        <CreateReservationForm restaurant_id={params.rid} />
      </div>
      <ReservationRestaurantDetail restaurant={restaurant.data} />
    </div>
  );
}
