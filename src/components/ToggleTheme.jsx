import PropTypes from "prop-types";

function ToggleTheme({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? "🌞" : "🌙"}
    </button>
  );
}

ToggleTheme.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default ToggleTheme;
