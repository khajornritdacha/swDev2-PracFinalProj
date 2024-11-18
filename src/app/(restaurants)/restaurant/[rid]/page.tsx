import Image from 'next/image';
import getRestaurant from '@/libs/getRestaurant';
import RestaurantIcon from "../../../../../public/logo/restaurant.svg";
import PinIcon from "../../../../../public/logo/pin.svg";
import Link from 'next/link';
import RestaurantDetail from '../../../../components/RestaurantDetail'; // Import the new component

export default async function RestaurantDetailPage({ params }: { params: { rid: string } }) {
    
    // Fetch the restaurant data
    const RestaurantDetailData = await getRestaurant(params.rid);
    console.log("Restaurant Detail:", RestaurantDetailData);

    // If RestaurantDetail is null or undefined, show error or fallback
    const restaurant = RestaurantDetailData?.data;

    if (!restaurant) {
        return <div>Restaurant not found!</div>;
    }

    return (
        <>
            <div className='h-full w-full flex flex-col items-center justify-center gap-16'>
                {/* Render the RestaurantDetail component and pass the restaurant data */}
                <RestaurantDetail restaurant={restaurant} />
            </div>
        </>
    );
}
