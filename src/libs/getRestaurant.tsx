import { AxiosResponse } from "axios";
import axiosInstance from "./axios";
import { RestaurantDto, StatusResponse } from "@/interface";

export default async function getRestaurant(id: string) {
  const res = (await axiosInstance.get(`/restaurants/${id}`)) as AxiosResponse<
    { data: RestaurantDto } & StatusResponse
  >;
  return res.data;
}
