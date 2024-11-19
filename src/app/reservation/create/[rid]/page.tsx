import CreateReservationForm from "@/components/CreateReservationForm";

export default function CreateReservationPage({
  params,
}: {
  params: { rid: string };
}) {
  return <CreateReservationForm restaurant_id={params.rid} />;
  // return <div>create reservation with {params.rid}</div>;
}
