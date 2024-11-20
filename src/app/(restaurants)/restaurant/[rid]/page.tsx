import AdminBar from "@/components/AdminBar";
import RestaurantDetail from "@/components/RestaurantDetail"; // Import the new component
import getRestaurant from "@/libs/getRestaurant";
import { AxiosError } from "axios";

export default async function RestaurantDetailPage({
  params,
}: {
  params: { rid: string };
}) {
  // Fetch the restaurant data
  let restaurant = null;
  try {
    const RestaurantDetailData = await getRestaurant(params.rid);
    restaurant = RestaurantDetailData?.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        return <div>Restaurant not found!</div>;
      }
    }
    console.error(err);
  }

  // If RestaurantDetail is null or undefined, show error or fallback

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
