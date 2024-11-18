import axiosInstance from "./axios";

export default async function getUserProfile(token: string) {
  const path = "/auth/me";
  const res = await axiosInstance.get(path, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data.data;
}
