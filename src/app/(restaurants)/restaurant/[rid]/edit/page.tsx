"use client";
import React, { useState, useEffect } from 'react';
import RestaurantForm from '../../../../../components/RestaurantForm';
import getRestaurant from '@/libs/getRestaurant';
import { useRouter } from 'next/navigation';
import RestaurantDetail from '@/components/RestaurantDetail';

const RestaurantEditPage = ({ params }: { params: { rid: string } }) => {
  const router = useRouter();
  const rid = params.rid; // Get the restaurant ID from dynamic routing

  const [restaurant, setRestaurant] = useState({
    name: '',
    foodtype: '',
    address: '',
    province: '',
    postalcode: '',
    tel: '',
    picture: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch restaurant data when component mounts or when rid changes
  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!rid) {
        setError('Invalid restaurant ID');
        setLoading(false);
        return;
      }

      try {
        const restaurantDetailData = await getRestaurant(rid);
        const restaurantData = restaurantDetailData?.data;

        if (restaurantData) {
          setRestaurant(restaurantData); // Set fetched restaurant data
        } else {
          setError('Restaurant not found!'); // Handle case when no restaurant data is found
        }
      } catch (err) {
        setError('Error fetching restaurant data'); // Handle error during fetch
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [rid]); // Dependency on rid to refetch if it changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle form submission and update restaurant data
  const handleFormSubmit = (newRestaurantData: typeof restaurant) => {
    setRestaurant(newRestaurantData);
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
          <RestaurantForm onSubmit={handleFormSubmit} initialData={restaurant} />
        </div>
        <div className='gap-8 py-4 items-center flex flex-col'>
            <div className="h-auto text-[20px] font-extrabold text-[#999999]">
                    Detail Page
            </div>
            <RestaurantDetail restaurant={restaurant} /> {/* Pass restaurant data as prop */}
        </div>
      </div>
    </>
  );
};

export default RestaurantEditPage;
