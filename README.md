# AI-Travel-Planner-
AI-powered travel planner that creates personalized day-by-day itineraries based on destination, budget, travel style, and travelers. Uses OpenRouter for AI generation, Geoapify for real-world locations, and Leaflet for interactive maps.
# ✈️ AI Travel Planner

AI-powered travel planner that creates personalized day-by-day itineraries based on destination, budget, travel style, and number of travelers.

## 📸 Screenshots

### 🏠 Travel Planner Interface
<!-- Add your screenshot here -->

### ✈️ Generated Trip
<!-- Add your screenshot here -->

### 🗺️ Interactive Map
<!-- Add your screenshot here -->

## 🚀 Features

- 🤖 AI-generated personalized travel itineraries
- 💰 Budget-based trip planning
- 👥 Supports multiple travelers
- 📅 Day-by-day itinerary generation
- 🎯 Multiple travel styles
- 📍 Real-world locations using Geoapify
- 🗺️ Interactive maps using Leaflet
- 💵 Estimated daily and total trip costs
- ⏳ Loading indicator while generating trips
- 📱 Responsive user interface

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Leaflet
- React-Leaflet

### Backend & APIs
- Next.js API Routes
- OpenRouter API
- Geoapify API

### Tools
- VS Code
- Node.js
- npm
- Git
- GitHub

## 🔄 How It Works

1. User enters the destination, budget, number of days, number of travelers, and travel style.
2. The application sends the information to the Next.js backend.
3. Geoapify is used to find real-world places and their coordinates.
4. The verified location data is provided to the AI through OpenRouter.
5. The AI generates a structured day-by-day itinerary.
6. The itinerary is displayed as organized trip cards.
7. The recommended locations are displayed on an interactive Leaflet map.

## 🧠 AI Integration

OpenRouter is used to generate the travel itinerary.

The AI receives:
- Destination
- Budget
- Number of days
- Number of travelers
- Travel style
- Verified real-world locations

The model returns structured JSON containing the itinerary, activities, places, and estimated costs.

## 📍 Location Integration

Geoapify provides real-world location data including:

- Place names
- Coordinates
- Addresses
- Geographic information

This helps the application use actual locations instead of relying entirely on AI-generated place names.

## 🗺️ Map Integration

Leaflet and React-Leaflet are used to display the recommended locations on an interactive map.

Each location can be represented using a map marker based on its latitude and longitude.

## 📁 Project Structure

```text
AI-Travel-Planner/
│
├── app/
│   ├── api/
│   │   └── generate-trip/
│   │       └── route.ts
│   │
│   ├── components/
│   │   └── TravelMap.tsx
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── public/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
