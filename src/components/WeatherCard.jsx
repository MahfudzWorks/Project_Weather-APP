import PropTypes from "prop-types";

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="text-center mt-4">
      <h2 className="text-2xl font-semibold">{weather.name}</h2>
      <p className="text-4xl font-bold my-2">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="capitalize text-lg">{weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto mt-2"
      />
    </div>
  );
}

WeatherCard.propTypes = {
  weather: PropTypes.object,
};

export default WeatherCard;
