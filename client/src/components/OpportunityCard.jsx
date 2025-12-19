import React from 'react';
import { MapPin, Calendar, Clock, Users, ChevronRight } from 'lucide-react';

const OpportunityCard = ({ opportunity, onClick, index }) => {
  const volunteersPercentage = (opportunity.volunteers.current / opportunity.volunteers.required) * 100;

  return (
    <div
      onClick={() => onClick(opportunity)}
      style={{ animationDelay: `${index * 0.1}s` }}
      className="rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fadeIn bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{opportunity.image}</div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white">
          {opportunity.category}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {opportunity.title}
      </h3>
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
        {opportunity.organizationName}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {opportunity.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {new Date(opportunity.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {opportunity.time}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Users className="w-4 h-4 inline mr-1" />
            {opportunity.volunteers.current}/{opportunity.volunteers.required} volunteers
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500"
            style={{ width: `${volunteersPercentage}%` }}
          ></div>
        </div>
      </div>

      <button className="w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
        Learn More
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default OpportunityCard;