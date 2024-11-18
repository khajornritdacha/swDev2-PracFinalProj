export default async function userRegister(
  name: string,
  tel: string,
  email: string,
  password: string
) {
  // TODO: change the URL to the actual API URL
  console.log(`URL: ${process.env.BACKEND_API_URL}`);
  //   const URL = `${process.env.BACKEND_API_URL}/auth/register`;
  const URL = `http://localhost:5001/api/v1/auth/register`;
  const role = "user";
  const createdAt = new Date().toISOString();
  const rawRes = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      tel: tel,
      email: email,
      password: password,
      role: role,
      createdAt: createdAt,
    }),
  });

  if (!rawRes.ok) {
    throw new Error("Failed to register");
  }

  const res = await rawRes.json();
  return res;
}
