export default async function getUserProfile(token: string) {
  // TODO: CHANGE API TO BACKEND URL
  const URL = `${process.env.BACKEND_API_URL}/auth/me`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user profile");
  }

  return await response.json();
}
