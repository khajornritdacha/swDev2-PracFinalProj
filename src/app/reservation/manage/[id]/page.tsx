export default function EditReservationPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: handle fetch data and update data and toast on success
  return (
    <>
      <div>Hello edit reservation on {params.id}</div>
    </>
  );
}
