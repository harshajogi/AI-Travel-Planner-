# ✈️ AI Travel Planner

An AI-powered travel planning web application that creates personalized, budget-aware, day-by-day travel itineraries based on the user's destination, budget, number of days, travel style, and number of travelers.

The project combines **AI itinerary generation**, **real-world location data**, and an **interactive map** to provide a complete travel-planning experience.

---

## Screenshots

###  Home / Travel Planner

(<img width="1819" height="710" alt="Screenshot 2026-08-23 205814" src="https://github.com/user-attachments/assets/701efd41-bad1-4b24-9e1c-0c8eb8d61e4b" />
)

###  Generated Trip

(<img width="1829" height="688" alt="Screenshot 2026-08-23 205829" src="https://github.com/user-attachments/assets/2a770b68-43c7-4153-884f-3d04e20ae549" />)

###  Interactive Map

(<img width="1830" height="680" alt="Screenshot 2026-08-23 205859" src="https://github.com/user-attachments/assets/99f196ff-c474-42d9-a519-a5cf811b507c" />
)

---

##  Features

-  **AI-Powered Itinerary Generation**
  - Generates personalized travel plans using an LLM through OpenRouter.
  - Creates morning, afternoon, and evening activities for each day.
  - Adapts the itinerary according to destination, budget, trip duration, travel style, and number of travelers.

-  **Budget-Based Planning**
  - Takes the user's budget into account.
  - Provides estimated costs for individual days and the complete trip.
  - Supports both budget-friendly and luxury travel planning.

-  **Multiple Travelers**
  - Allows users to specify the number of travelers.
  - Uses the number of travelers when planning and estimating trip costs.

-  **Multiple Travel Styles**
  - Adventure
  - Relaxation
  - Family
  - Romantic
  - Luxury
  - Budget

- 📍 **Real-World Locations**
  - Uses Geoapify to retrieve real places and geographic coordinates.
  - Provides actual locations for the generated itinerary.
  - Reduces the possibility of completely fictional attractions.

- 🗺️ **Interactive Map**
  - Displays recommended locations using Leaflet.
  - Uses real latitude and longitude coordinates.
  - Allows users to visually explore recommended destinations.

- ⏳ **Loading State**
  - Displays a loading animation while the itinerary is being generated.
  - Prevents accidental multiple submissions.

- 📱 **Responsive Interface**
  - Designed for desktop, laptop, tablet, and mobile screens.
  - Uses Tailwind CSS for responsive styling.

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
| **OpenStreetMap** | Map data |
| **Node.js** | Runtime environment |
| **Git** | Version control |
| **GitHub** | Source code hosting |

---

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
│
├── screenshots/
│   ├── home.png
│   ├── trip.png
│   └── map.png
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

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
```

---

## 🔄 Application Workflow

```text
                    👤 User
                       │
                       ▼
             ┌─────────────────────┐
             │   Enter Trip Details │
             │                     │
             │ • Destination       │
             │ • Budget            │
             │ • Number of Days    │
             │ • Travelers         │
             │ • Travel Style      │
             └──────────┬──────────┘
                        │
                        ▼
               ┌─────────────────┐
               │ Next.js Frontend│
               └────────┬────────┘
                        │
                        │ POST Request
                        ▼
             ┌─────────────────────┐
             │ /api/generate-trip  │
             │      API Route      │
             └──────────┬──────────┘
                        │
               ┌────────┴────────┐
               │                 │
               ▼                 ▼
        ┌──────────────┐  ┌──────────────┐
        │   Geoapify   │  │  OpenRouter  │
        │              │  │              │
        │ Real Places  │  │ AI Planning  │
        │ Coordinates  │  │ Itinerary    │
        └──────┬───────┘  └──────┬───────┘
               │                 │
               └────────┬────────┘
                        ▼
               ┌─────────────────┐
               │ Structured Trip │
               │      Data       │
               └────────┬────────┘
                        │
               ┌────────┴────────┐
               ▼                 ▼
        ┌──────────────┐  ┌──────────────┐
        │  Trip Cards  │  │    Leaflet   │
        │              │  │     Map      │
        │ Day-by-Day   │  │ 📍 Markers   │
        │ Activities   │  │ 📍 Locations │
        └──────────────┘  └──────────────┘
```

---


## 📱 Responsive Design

The application is designed for:

-  Desktop
-  Laptop
-  Mobile
-  Tablet

Tailwind CSS is used to create responsive layouts and UI components.

---


##  Future Improvements

Possible future improvements include:

-  Hotel recommendations
-  Flight search integration
-  Transportation planning
-  Weather-based itinerary adjustments
-  Live travel price estimation
-  Automatic route optimization
-  User authentication
-  Save and load previous trips
-  Export itinerary as PDF
-  Calendar integration
-  Multi-language support
-  User ratings and reviews
-  Restaurant recommendations
-  Nearby places discovery
-  Automatic itinerary regeneration
-  Detailed budget breakdown
-  Distance and travel-time calculations

---

## 🎓 Educational Purpose

This project was created as a hands-on learning project to understand how modern web applications can combine multiple technologies into a single full-stack application.

The project provides practical experience with:

-  Artificial Intelligence
-  REST APIs
-  Geolocation services
-  Interactive maps
-  React
-  Next.js
-  TypeScript
-  Tailwind CSS
-  API integration
-  Full-stack web development
-  Structured data processing
-  Environment variables and API security

---

##  What I Learned

Through this project, I gained practical experience in:

- Building applications with Next.js
- Creating React components
- Working with TypeScript
- Designing responsive interfaces
- Creating backend API routes
- Integrating third-party APIs
- Working with AI APIs
- Using location and geocoding APIs
- Integrating interactive maps
- Handling asynchronous API requests
- Managing loading and error states
- Working with environment variables
- Structuring a full-stack project
- Using Git and GitHub for version control

---

## 🌟 Project Highlights

###  AI + Real-World Data

The project combines AI-powered travel planning with real-world location data to create more useful and realistic itineraries.

###  AI + Interactive Maps

Generated travel recommendations are connected to an interactive map so users can visually explore the suggested locations.

###  Personalized Planning

The itinerary is generated based on:

- Destination
- Budget
- Number of days
- Number of travelers
- Travel style

###  Modern Web Stack

The project combines:

**Next.js + React + TypeScript + Tailwind CSS + OpenRouter + Geoapify + Leaflet**

---

##  Author

### Harsha Jogi

B.Tech CSE student interested in:

- Software Development
- Artificial Intelligence
- Full-Stack Development
- APIs
- Machine Learning
- Data Structures & Algorithms

This project was built as a hands-on exploration of integrating AI, location services, APIs, and interactive maps into a modern web application.

---

##  Acknowledgements

Special thanks to the technologies and services used in this project:

- **Next.js**
- **React**
- **OpenRouter**
- **Geoapify**
- **Leaflet**
- **React-Leaflet**
- **OpenStreetMap**
- **Tailwind CSS**

---

##  License

This project is created for educational and portfolio purposes.

---

##  Support

If you found this project interesting or useful, consider giving the repository a ⭐ on GitHub!
