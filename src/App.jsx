import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import ToggleTheme from "./components/ToggleTheme";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();
      console.log(data);

      if (data.cod === "404" || data.cod === 404) {
        setError("❌ Kota tidak ditemukan!");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Fetch gagal:", error);
      setError("⚠️ Gagal mengambil data cuaca.");
      setWeather(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-sky-200 via-blue-300 to-blue-500 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-3xl shadow-2xl 
                   bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl 
                   border border-white/20 dark:border-gray-700/40"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
            🌦️{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
              Weatherly
            </span>
          </h1>
          <ToggleTheme darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={fetchWeather}
          onKeyDown={handleKeyDown}
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mt-3"
          >
            {error}
          </motion.p>
        )}

        <WeatherCard weather={weather} />
      </motion.div>

      <p className="mt-8 text-xs opacity-70 tracking-wide">
        Dibuat dengan 💙 React + TailwindCSS + Framer Motion
      </p>
    </div>
  );
}

export default App;
