import { ReservationDto } from "@/interface";

export default async function getReservations(
  token: string
): Promise<ReservationDto[]> {
  const URL = `${process.env.BACKEND_API_URL}/bookings`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get reservations");
  }

  return (await response.json()).data;
}
