import { useState, useEffect } from "react";

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
        setError("Kota tidak ditemukan!");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Fetch gagal:", error);
      setError("Gagal mengambil data cuaca.");
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
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-200 to-blue-500 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide">🌤️ Weather App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Masukkan nama kota..."
            className="flex-grow px-4 py-2 rounded-l-xl outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-xl"
          >
            Cari
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {weather && (
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p className="text-4xl font-bold my-2">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="capitalize text-lg">
              {weather.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto mt-2"
            />
          </div>
        )}
      </div>

      <p className="mt-6 text-sm opacity-70">
        Dibuat dengan 💙 React + TailwindCSS
      </p>
    </div>
  );
}

export default App;
