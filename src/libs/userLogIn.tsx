import axiosInstance from "./axios";

export default async function userLogIn(email: string, password: string) {
  const path = "/auth/login";
  const res = await axiosInstance.post(
    path,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
