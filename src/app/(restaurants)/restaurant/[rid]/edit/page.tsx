"use client";
import RestaurantDetail from "@/components/RestaurantDetail";
import RestaurantForm from "@/components/RestaurantForm";
import { RestaurantDto } from "@/interface";
import getRestaurant from "@/libs/getRestaurant";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const RestaurantEditPage = ({ params }: { params: { rid: string } }) => {
  const rid = params.rid; // Get the restaurant ID from dynamic routing
  const session = useSession();

  const [restaurant, setRestaurant] = useState<RestaurantDto>({
    _id: "",
    name: "",
    foodtype: "",
    address: "",
    province: "",
    postalcode: "",
    tel: "",
    picture: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch restaurant data when component mounts or when rid changes
  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!rid) {
        setError("Invalid restaurant ID");
        setLoading(false);
        return;
      }

      try {
        const restaurantDetailData = await getRestaurant(rid);
        const restaurantData = restaurantDetailData?.data;

        if (restaurantData) {
          setRestaurant(restaurantData); // Set fetched restaurant data
        } else {
          setError("Restaurant not found!"); // Handle case when no restaurant data is found
        }
      } catch {
        setError("Error fetching restaurant data"); // Handle error during fetch
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [rid]); // Dependency on rid to refetch if it changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle form submission and update restaurant data
  const handleFormSubmit = (newRestaurantData: RestaurantDto) => {
    setRestaurant({ ...newRestaurantData, _id: rid });
  };

  return (
    <>
      <div className="h-full w-full flex flex-wrap justify-center">
        <div className="flex flex-col justify-start items-center">
          <div className="w-[80%] h-auto border-b-4 border-[#EC0808] flex items-center justify-center">
            <div className="h-auto text-[36px] font-semibold text-black">
              Edit
            </div>
          </div>
          <RestaurantForm
            onSubmit={handleFormSubmit}
            initialData={restaurant}
            rid={rid}
            token={session?.data?.user?.token || ""}
          />
        </div>
        <div className="gap-8 py-4 items-center flex flex-col">
          <div className="h-auto text-[20px] font-extrabold text-[#999999]">
            Detail Page
          </div>
          <RestaurantDetail restaurant={restaurant} hideBookingButton={true} />{" "}
          {/* Pass restaurant data as prop */}
        </div>
      </div>
    </>
  );
};

export default RestaurantEditPage;
