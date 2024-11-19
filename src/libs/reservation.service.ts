import { DeleteResponse, GetReservationJson } from "@/interface";
import axiosInstance from "./axios";
import { AxiosResponse } from "axios";

export async function getReservations(
  token: string
): Promise<GetReservationJson> {
  const path = `/bookings`;
  const res = (await axiosInstance.get(path, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<GetReservationJson>;

  return res.data as GetReservationJson;
}

export async function deleteReservation(
  reservation_id: string,
  token: string
): Promise<DeleteResponse> {
  const res = (await axiosInstance.delete(`/bookings/${reservation_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<DeleteResponse>;

  return res.data;
}
