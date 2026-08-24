"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const TravelMap = dynamic(
  () => import("./components/TravelMap"),
  { ssr: false }
);
export default function Home() {
const [destination, setDestination] = useState("");
const [budget, setBudget] = useState("");
const [days, setDays] = useState("");
const [style, setStyle] = useState("Adventure");
const [travelers, setTravelers] = useState("1");
const [trip, setTrip] = useState<any>(null);
const [loading, setLoading] = useState(false);
const handleGenerateTrip = async () => {
  setLoading(true);

  try {
    const response = await fetch("/api/generate-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination,
        budget,
        days,
        style,
        travelers,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data.error);
      return;
    }

    setTrip(data.trip);
  } catch (error) {
    console.error("Request failed:", error);
  } finally {
    setLoading(false);
  }
};
const mapPlaces =
  trip?.days?.flatMap((day: any) => [
    day.morning.place,
    day.afternoon.place,
    day.evening.place,
  ]) || [];
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="w-full max-w-6xl mx-auto">
        
        <h1 className="text-5xl font-bold text-center mb-4">
          ✈️ AI Travel Planner
        </h1>

        <p className="text-center text-slate-400 mb-10">
          Plan your perfect trip with the power of AI.
        </p>

        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl space-y-6">

          {/* Destination */}
          <div>
            <label className="block mb-2 font-medium">
              Where do you want to go?
            </label>

            <input
              type="text"
              placeholder="e.g. Goa, Manali, Paris"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Budget and Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Budget (₹)
              </label>

              <input
                type="number"
                placeholder="20000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Number of days
              </label>

              <input
                type="number"
                placeholder="4"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Travelers
              </label>

              <input
                type="number"
                min="1"
                placeholder="2"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          {/* Travel Style */}
          <div>
            <label className="block mb-2 font-medium">
              Travel style
            </label>

            <select 
            value={style}
            onChange={(e) => setStyle(e.target.value)} 
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 outline-none focus:border-blue-500"
            >
              <option>Adventure</option>
              <option>Relaxation</option>
              <option>Family</option>
              <option>Romantic</option>
              <option>Luxury</option>
              <option>Budget</option>
            </select>
          </div>

          {/* Button */}
          <button
            onClick={handleGenerateTrip}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg p-3 font-semibold transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating your trip...
              </>
            ) : (
              "✨ Generate My Trip"
            )}
          </button>

        </div>
      </div>
    {trip && (
  <div className="mt-10">

    {/* Trip Header */}
    <div className="bg-slate-900 rounded-2xl p-6 mb-6">
      <h2 className="text-3xl font-bold">
        ✈️ {trip.destination}
      </h2>

      <p className="text-slate-400 mt-2">
        {trip.days.length} Day Trip
      </p>

      <p className="text-green-400 mt-2 font-semibold">
        💰 Estimated Total: ₹{trip.total_estimated_cost}
      </p>
    </div>

    {/* Day Cards */}
    <div className="space-y-6">

      {trip.days.map((day: any) => (
        <div
          key={day.day}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
        >

          <h3 className="text-2xl font-bold mb-5">
            🌅 Day {day.day}
          </h3>

          <div className="space-y-4">

            <div>
              <h4 className="font-semibold text-yellow-400">
                🌅 Morning
              </h4>

              <p className="text-slate-300 mt-1">
                {day.morning.activity}
              </p>

              <p className="text-slate-400 text-sm mt-1">
                📍 {day.morning.place.name}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400">
                ☀️ Afternoon
              </h4>

              <p className="text-slate-300 mt-1">
                {day.afternoon.activity}
              </p>

              <p className="text-slate-400 text-sm mt-1">
                📍 {day.afternoon.place.name}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-400">
                🌙 Evening
              </h4>

              <p className="text-slate-300 mt-1">
                {day.evening.activity}
              </p>

              <p className="text-slate-400 text-sm mt-1">
                📍 {day.evening.place.name}
              </p>
            </div>

          </div>

          <div className="mt-5 pt-4 border-t border-slate-800">
            <span className="text-green-400 font-semibold">
              💰 Estimated Cost: ₹{day.estimated_cost}
            </span>
          </div>

        </div>
      ))}

    </div>
        {/* Map */}
    {mapPlaces.length > 0 && (
      <TravelMap places={mapPlaces} />
    )}
  </div>
)}  

    </main>
  );
}