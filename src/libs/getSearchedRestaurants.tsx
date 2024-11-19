// Ensure getSearchedRestaurants is a valid async function that returns a Promise

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
    .filter(([key, value]) => value !== "" && value !== null)
    .reduce<{ [key: string]: string }>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

// Convert filtered params to query string
const queryString = new URLSearchParams(filteredParams).toString();

// Construct the full URL
const apiUrl = `http://localhost:5001/api/v1/restaurants?${queryString}`;
  console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);
    console.log(response)
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch restaurants: ${response.statusText} - ${errorMessage}`);
    }

    const data = await response.json();
    return data; // Assuming this returns the restaurant data, including pagination info
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch restaurants");
  }
}
