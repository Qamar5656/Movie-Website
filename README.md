
# 🎬 Movie Website - React + Vite + TMDB API

A responsive and interactive movie search application built using **React**, **Vite**, **Tailwind CSS**, and the **TMDB API**.

## 🔗 Live Demo

Coming Soon (Netlify link)

## 📌 Features

- 🔍 **Search Functionality with Debouncing** – Filters movies as you type with a 500ms delay to reduce performance overhead
- 🧭 **React Router DOM** – Client-side routing for a smooth navigation experience
- 📦 **Reusable Components** – Structured and scalable component architecture (Navbar, MovieCard, etc.)
- 🌐 **API Integration (Axios)** – Fetches movie data from TMDB (The Movie Database)
- 🧠 **Zustand Store** – Lightweight global state management (used for loading spinner)
- 🎨 **Tailwind CSS** – Fully responsive design across desktop, tablet, and mobile
- 📁 **Vite** – Lightning-fast build and dev server for React

## 📷 Screenshots

| Desktop | Mobile |
|--------|--------|
| ![desktop](./screenshots/desktop.png) | ![mobile](./screenshots/mobile.png) |

## 🚀 Technologies Used

- React
- Vite
- React Router DOM
- Zustand (for global state)
- Axios
- Tailwind CSS
- TMDB API

## 🛠️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/Qamar5656/Movie-Website.git
cd Movie-Website

Install dependencies
npm install

Create a .env file in the root folder with the following content:
VITE_API_KEY=your_tmdb_api_key_here
VITE_BASE_URL=https://api.themoviedb.org/3

Run the development server:
npm run dev

