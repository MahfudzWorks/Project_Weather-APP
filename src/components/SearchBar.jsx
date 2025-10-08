import PropTypes from "prop-types";

function SearchBar({ city, setCity, onSearch, onKeyDown }) {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Masukkan nama kota..."
        className="flex-grow px-4 py-2 rounded-l-xl outline-none dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-xl"
      >
        Cari
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default SearchBar;
