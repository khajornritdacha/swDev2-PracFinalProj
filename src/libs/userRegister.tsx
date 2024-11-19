import axiosInstance from "./axios";

export default async function userRegister(
  name: string,
  tel: string,
  email: string,
  password: string
) {
  const URL = "/auth/register";
  const role = "user";
  const createdAt = new Date().toISOString();
  const res = await axiosInstance.post(
    URL,
    {
      name: name,
      tel: tel,
      email: email,
      password: password,
      role: role,
      createdAt: createdAt,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
