import { ReservationDto } from "@/interface";

export default async function ReservationCatalog({
  reservationDto,
}: {
  reservationDto: Promise<ReservationDto[]>;
}) {
  const reservations = await reservationDto;
  console.log("reservations");
  console.log(reservations);
  //   return null;
  return reservations.map((reservation) => (
    <div key={reservation.bookingDate}>
      <p>{reservation.bookingDate}</p>
      <p>{reservation.numOfGuests}</p>
      <p>{reservation.user}</p>
      <p>{reservation.restaurant}</p>
      <p>{reservation.createdAt}</p>
    </div>
  ));
}
