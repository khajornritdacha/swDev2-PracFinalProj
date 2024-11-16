export default async function userLogIn(email: string, password: string) {
  // TODO: change the URL to the actual API URL
  console.log(process.env.BACKEND_API_URL);
  const URL = `${process.env.BACKEND_API_URL}/auth/login`;
  const rawRes = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!rawRes.ok) {
    throw new Error("Failed to log in");
  }

  const res = await rawRes.json();
  return res;
}
