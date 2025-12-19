import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/opportunitySlice';

const SearchBar = ({ onFilterToggle }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.opportunities);

  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  return (
    <div className="rounded-2xl shadow-2xl p-6 bg-white dark:bg-gray-800 transition-all duration-300 animate-slideUp">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search opportunities, organizations, or locations..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 outline-none"
          />
        </div>
        <button
          onClick={onFilterToggle}
          className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>
    </div>
  );
};

export default SearchBar;