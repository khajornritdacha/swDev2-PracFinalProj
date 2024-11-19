import axiosInstance from "./axios";

export default async function getRestaurants() {
  const res = await axiosInstance.get("/restaurants");
  return res.data;
}
