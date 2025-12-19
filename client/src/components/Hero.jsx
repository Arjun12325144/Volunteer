import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Make a Difference Today
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Connect with local organizations and find volunteer opportunities that match your interests and schedule.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/opportunities')}
            className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Explore Opportunities
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {
              document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-xl font-bold text-lg bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;