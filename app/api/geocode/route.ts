export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "City is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      city
    )}&limit=1&apiKey=${process.env.GEOAPIFY_API_KEY}`
  );

  const data = await response.json();

  return Response.json(data);
}