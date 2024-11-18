import { GetReservationJson } from "@/interface";
import axiosInstance from "./axios";
import { AxiosResponse } from "axios";

export default async function getReservations(
  token: string
): Promise<GetReservationJson> {
  const path = `/bookings`;
  const res = (await axiosInstance.get(path, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<GetReservationJson>;

  console.log(res.data);
  console.log(res.data.data[0].restaurant);

  return res.data as GetReservationJson;
}
