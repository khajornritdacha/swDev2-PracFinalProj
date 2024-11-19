import axiosInstance from "./axios";

export default async function getRestaurant(id: string) {
  const res = await axiosInstance.get(`/restaurants/${id}`);
  return res.data;
}
