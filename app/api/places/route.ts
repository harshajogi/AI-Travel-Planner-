export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "City is required" },
      { status: 400 }
    );
  }

  // First, find the coordinates of the city
  const geocodeResponse = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      city
    )}&limit=1&apiKey=${process.env.GEOAPIFY_API_KEY}`
  );

  const geocodeData = await geocodeResponse.json();

  if (!geocodeData.features?.length) {
    return Response.json(
      { error: "Location not found" },
      { status: 404 }
    );
  }

  const location = geocodeData.features[0].properties;

  const lat = location.lat;
  const lon = location.lon;

  // Now find tourist attractions around that location
  const placesResponse = await fetch(
    `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},30000&limit=10&apiKey=${process.env.GEOAPIFY_API_KEY}`
  );

  const placesData = await placesResponse.json();

  return Response.json({
    city,
    location: {
      lat,
      lon,
    },
    places: placesData.features,
  });
}