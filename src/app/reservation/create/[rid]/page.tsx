import CreateReservationForm from "@/components/CreateReservationForm";
import RestaurantDetail from "@/components/RestaurantDetail";
import getRestaurant from "@/libs/getRestaurant";

export default async function CreateReservationPage({
  params,
}: {
  params: { rid: string };
}) {
  const restaurant = await getRestaurant(params.rid);
  return (
    <div className="flex flex-col sm:flex-row-reverse">
      <CreateReservationForm restaurant_id={params.rid} />
      <div className="flex h-[500px]">
        <RestaurantDetail
          restaurant={restaurant.data}
          hideBookingButton={true}
        />
      </div>
    </div>
  );
}
