import axiosInstance from "./axios";

export default async function getSearchedRestaurants({
  searchQuery = "",
  cuisine = "",
  province = "",
  sortOption = "",
  page = 1, // Default value as per Swagger spec
  limit = 10, // Default value as per Swagger spec
}: {
  searchQuery?: string;
  cuisine?: string;
  province?: string;
  sortOption?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    search: searchQuery,
    cuisine,
    province,
    sort: sortOption,
    page: page.toString(),
    limit: limit.toString(),
  });

  // Filter out empty or null parameters
  const filteredParams = Object.entries(Object.fromEntries(params.entries()))
    .filter(([, value]) => value !== "" && value !== null)
    .reduce<{ [key: string]: string }>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  // Convert filtered params to query string
  const queryString = new URLSearchParams(filteredParams).toString();

  // Construct the full URL
  const res = await axiosInstance.get(`/restaurants?${queryString}`);
  return res.data;
}
