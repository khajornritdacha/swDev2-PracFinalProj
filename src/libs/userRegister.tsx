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
  console.log(name, tel, email, password, role, createdAt);
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

  console.log(res.status);
  console.log(res.data);

  return res.data;
}
