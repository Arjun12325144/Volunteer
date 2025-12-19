import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/opportunitySlice';

const categories = ['All', 'Environment', 'Community Service', 'Animal Welfare', 'Education', 'Healthcare'];

const FilterSection = ({ show }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.opportunities);

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  if (!show) return null;

  return (
    <div className="mt-6 animate-slideUp">
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              filters.category === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;