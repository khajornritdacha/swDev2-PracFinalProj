import EditReservationForm from "@/components/EditReservationForm";

export default function EditReservationPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: handle fetch data and update data and toast on success
  return (
    <div className="flex flex-col sm:flex-row-reverse">
      <EditReservationForm />
    </div>
  );
}
