# ✈️ AI Travel Planner

An AI-powered travel planning web application that creates personalized, budget-aware, day-by-day travel itineraries based on the user's destination, budget, number of days, travel style, and number of travelers.

The project combines **AI itinerary generation**, **real-world location data**, and an **interactive map** to provide a complete travel-planning experience.

---

## 📸 Screenshots

### 🏠 Home / Travel Planner

![Home Page](./screenshots/home.png)

### ✈️ Generated Trip

![Generated Trip](./screenshots/trip.png)

### 🗺️ Interactive Map

![Interactive Map](./screenshots/map.png)

---

## ✨ Features

- 🤖 **AI-Powered Itinerary Generation**
  - Generates personalized travel plans using an LLM through OpenRouter.
  - Creates morning, afternoon, and evening activities for each day.

- 💰 **Budget-Based Planning**
  - Takes the user's budget into account.
  - Calculates estimated costs for individual days and the complete trip.

- 👥 **Multiple Travelers**
  - Allows users to specify the number of travelers.

- 🎯 **Multiple Travel Styles**
  - Adventure
  - Relaxation
  - Family
  - Romantic
  - Luxury
  - Budget

- 📍 **Real-World Locations**
  - Uses Geoapify to retrieve real places and geographic coordinates.
  - The AI uses verified locations instead of randomly inventing attractions.

- 🗺️ **Interactive Map**
  - Displays recommended locations using Leaflet.
  - Places markers using real latitude and longitude coordinates.

- ⏳ **Loading State**
  - Shows a loading animation while the AI generates the itinerary.
  - Prevents multiple requests from being submitted accidentally.

- 📱 **Responsive Interface**
  - Designed for both desktop and mobile screens.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Full-stack React framework |
| **React** | User interface |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling and responsive design |
| **OpenRouter** | AI itinerary generation |
| **Geoapify** | Geocoding and real-world places |
| **Leaflet** | Interactive maps |
| **React-Leaflet** | Leaflet integration with React |
| **Node.js** | Runtime environment |
| **Git & GitHub** | Version control |

---

## 🏗️ Architecture

```text
                         👤 User
                           │
                           ▼
                 ┌───────────────────┐
                 │   Next.js / React │
                 │     Frontend      │
                 └─────────┬─────────┘
                           │
                           │ POST Request
                           ▼
                 ┌───────────────────┐
                 │ /api/generate-trip│
                 │    API Route      │
                 └─────────┬─────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
     ┌─────────────────┐       ┌─────────────────┐
     │    Geoapify     │       │    OpenRouter   │
     │                 │       │                 │
     │ Real places     │       │ AI generation   │
     │ Coordinates     │       │ Trip planning   │
     └────────┬────────┘       └────────┬────────┘
              │                         │
              └────────────┬────────────┘
                           ▼
                  ┌─────────────────┐
                  │ Structured JSON │
                  │  Trip Response  │
                  └────────┬────────┘
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
          ┌──────────────┐   ┌──────────────┐
          │  Trip Cards  │   │    Leaflet   │
          │              │   │     Map      │
          │ Day 1        │   │ 📍 Places    │
          │ Day 2        │   │ 📍 Markers   │
          │ Day 3        │   │              │
          └──────────────┘   └──────────────┘
