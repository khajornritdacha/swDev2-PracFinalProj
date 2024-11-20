import AdminBar from "@/components/AdminBar";
import RestaurantDetail from "@/components/RestaurantDetail"; // Import the new component
import getRestaurant from "@/libs/getRestaurant";

export default async function RestaurantDetailPage({
  params,
}: {
  params: { rid: string };
}) {
  // Fetch the restaurant data
  const RestaurantDetailData = await getRestaurant(params.rid);

  // If RestaurantDetail is null or undefined, show error or fallback
  const restaurant = RestaurantDetailData?.data;

  if (!restaurant) {
    return <div>Restaurant not found!</div>;
  }

  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center gap-16">
        <AdminBar rid={params.rid} />
        <RestaurantDetail restaurant={restaurant} />
      </div>
    </>
  );
}
