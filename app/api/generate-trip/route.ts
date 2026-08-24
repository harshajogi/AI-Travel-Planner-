export async function POST(request: Request) {
  const body = await request.json();
  const geocodeResponse = await fetch(
  `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    body.destination
  )}&limit=1&apiKey=${process.env.GEOAPIFY_API_KEY}`
);

const geocodeData = await geocodeResponse.json();

if (!geocodeData.features?.length) {
  return Response.json(
    { error: "Destination not found" },
    { status: 404 }
  );
}

const location = geocodeData.features[0].properties;

const placesResponse = await fetch(
  `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${location.lon},${location.lat},30000&limit=15&apiKey=${process.env.GEOAPIFY_API_KEY}`
);

const placesData = await placesResponse.json();

const realPlaces = placesData.features.map((place: any) => ({
  name: place.properties.name,
  address: place.properties.formatted,
  latitude: place.properties.lat,
  longitude: place.properties.lon,
}));

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "liquid/lfm-2.5-2.6b:free",
        messages: [
          {
            role: "user",
            content: `
                You are an AI travel planner.

                Create a ${body.days}-day trip to ${body.destination}
                for ${body.travelers} traveler(s).

                Budget: ₹${body.budget}
                Travel style: ${body.style}

                IMPORTANT:
                Use ONLY places from the following verified places list.
                Do not invent places.
                Do not create fictional attractions.
                Choose appropriate places from this list based on the travel style.

                Verified places:
                ${JSON.stringify(realPlaces, null, 2)}

                Return ONLY valid JSON.
                Do not include markdown.
                Do not include explanations outside the JSON.

                Use exactly this structure:

                {
                  "destination": "${body.destination}",
                  "days": [
                    {
                      "day": 1,
                      "morning": {
                        "activity": "string",
                        "place": {
                              "name": "string",
                              "latitude": 0,
                              "longitude": 0
                            }
                      },
                      "afternoon": {
                        "activity": "string",
                        "place": {
                            "name": "string",
                            "latitude": 0,
                            "longitude": 0
                          }
                      },
                      "evening": {
                        "activity": "string",
                        "place": {
                            "name": "string",
                            "latitude": 0,
                            "longitude": 0
                          }
                      },
                      "estimated_cost": 0
                    }
                  ],
                  "budget_breakdown": {
                    "accommodation": 0,
                    "food": 0,
                    "transportation": 0,
                    "activities": 0
                  },
                  "total_estimated_cost": 0
                }

                Make exactly ${body.days} day objects.

                For every day, estimated_cost must be a number greater than 0.

                For budget_breakdown, every value must be a number greater than 0.

                Calculate realistic estimated costs based on:
                - destination
                - number of travelers
                - number of days
                - travel style
                - total budget

                Keep the total estimated cost within the given budget.

                The total estimated cost must include:
                - accommodation
                - food
                - transportation
                - activities
              For every place, use the exact name and coordinates from the verified places list.
              Do not modify or invent the coordinates.
                Return ONLY valid JSON.`,
          },
        ],
      }),
    }
  );
  if (!response.ok) {
  const errorData = await response.json();

  return Response.json(
    {
      error: errorData.error?.message || "Something went wrong",
    },
    {
      status: response.status,
    }
  );
}

  const data = await response.json();

  const tripText = data.choices[0].message.content;

  const trip = JSON.parse(tripText);

  return Response.json({
  trip,
});
}