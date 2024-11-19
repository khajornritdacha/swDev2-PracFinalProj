import {
  CreateReservationDto,
  DeleteResponse,
  GetReservationDto,
  GetReservationJson,
  StatusResponse,
} from "@/interface";
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

export async function getOneReservation(reservation_id: string, token: string) {
  const path = `/bookings/${reservation_id}`;
  const res = (await axiosInstance.get(path, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<{ data: GetReservationDto } & StatusResponse>;

  return res.data;
}

export async function deleteReservation(
  reservation_id: string,
  token: string
): Promise<DeleteResponse> {
  const res = (await axiosInstance.delete(`/bookings/${reservation_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<StatusResponse>;

  return res.data;
}

export async function editReservation(
  editReservationDto: CreateReservationDto,
  token: string,
  reservation_id: string
) {
  const res = (await axiosInstance.put(
    `/bookings/${reservation_id}`,
    editReservationDto,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )) as AxiosResponse<{ data: GetReservationDto } & StatusResponse>;

  return res.data;
}

export async function createReservation(
  createReservationDto: CreateReservationDto,
  token: string,
  restaurant_id: string
) {
  const res = (await axiosInstance.post(
    `/restaurants/${restaurant_id}/bookings`,
    createReservationDto,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )) as AxiosResponse<{ data: CreateReservationDto } & StatusResponse>;

  return res.data;
}
