interface GetHospitalDto {
  success: boolean;
  data: HospitalItem;
}

export default async function getHospital(
  hid: string
): Promise<GetHospitalDto> {
  const response = await fetch(
    `https://vaccine-app-backend-delta.vercel.app/api/v1/hospitals/${hid}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch hospital");
  }
  return await response.json();
}
