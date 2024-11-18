import { ReservationDto } from "@/interface";
import ReservationCard from "./ReservationCard";

// TODO: change to use real data
export default async function ReservationCatalog({
  reservationDto,
}: {
  reservationDto: Promise<ReservationDto[]>;
}) {
  // const reservations = await reservationDto
  const reservations = [
    {
      bookingDate: "2024-10-01",
      numOfGuests: 4,
      user: "Joe",
      restaurant: "KFC",
      createdAt: "2024-09-01",
    },
    {
      bookingDate: "2024-10-01",
      numOfGuests: 4,
      user: "Joe",
      restaurant: "KFC",
      createdAt: "2024-09-01",
    },
    {
      bookingDate: "2024-10-01",
      numOfGuests: 4,
      user: "Joe",
      restaurant: "KFC",
      createdAt: "2024-09-01",
    },
  ];
  return (
    <div className="flex justify-center flex-col items-center rounded-3xl gap-6">
      {reservations.map((reservation) => (
        <ReservationCard
          key={`${reservation.bookingDate}, ${reservation.user}`}
          reservation={reservation}
        />
      ))}
    </div>
  );
}
