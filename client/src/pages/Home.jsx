// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOpportunities } from '../redux/slices/opportunitySlice';
// import Header from '../components/Header';
// import Hero from '../components/Hero';
// import SearchBar from '../components/SearchBar';
// import FilterSection from '../components/FilterSection';
// import OpportunityCard from '../components/OpportunityCard';
// import OpportunityModal from '../components/OpportunityModal';
// import AuthModal from '../components/AuthModal';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { opportunities, loading, filters } = useSelector((state) => state.opportunities);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedOpportunity, setSelectedOpportunity] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   useEffect(() => {
//     dispatch(fetchOpportunities(filters));
//   }, [dispatch, filters]);

//   return (
//     <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
//       <Header onAuthClick={() => setShowAuthModal(true)} />
//       <Hero />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
//         <div className="mb-8">
//           <SearchBar onFilterToggle={() => setShowFilters(!showFilters)} />
//           <FilterSection show={showFilters} />
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading opportunities...</p>
//           </div>
//         ) : opportunities.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-lg text-gray-600 dark:text-gray-400">
//               No opportunities found. Try adjusting your filters or search terms.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {opportunities.map((opportunity, index) => (
//               <OpportunityCard
//                 key={opportunity._id}
//                 opportunity={opportunity}
//                 onClick={setSelectedOpportunity}
//                 index={index}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {selectedOpportunity && (
//         <OpportunityModal
//           opportunity={selectedOpportunity}
//           onClose={() => setSelectedOpportunity(null)}
//         />
//       )}

//       {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
//     </div>
//   );
// };

// export default Home;
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOpportunities } from '../redux/slices/opportunitySlice';
// import Header from '../components/Header';
// import Hero from '../components/Hero';
// import SearchBar from '../components/SearchBar';
// import FilterSection from '../components/FilterSection';
// import OpportunityCard from '../components/OpportunityCard';
// import OpportunityModal from '../components/OpportunityModal';
// import AuthModal from '../components/AuthModal';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { opportunities, loading, filters } = useSelector((state) => state.opportunities);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedOpportunity, setSelectedOpportunity] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   useEffect(() => {
//     dispatch(fetchOpportunities(filters));
//   }, [dispatch, filters]);

//   return (
//     <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
//       <Header onAuthClick={() => setShowAuthModal(true)} />
//       <Hero />

//       <div id="search-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
//         <div className="mb-8">
//           <SearchBar onFilterToggle={() => setShowFilters(!showFilters)} />
//           <FilterSection show={showFilters} />
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading opportunities...</p>
//           </div>
//         ) : opportunities.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-lg text-gray-600 dark:text-gray-400">
//               No opportunities found. Try adjusting your filters or search terms.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {opportunities.slice(0, 6).map((opportunity, index) => (
//               <OpportunityCard
//                 key={opportunity._id}
//                 opportunity={opportunity}
//                 onClick={setSelectedOpportunity}
//                 index={index}
//               />
//             ))}
//           </div>
//         )}

//         {/* View All Button */}
//         {opportunities.length > 6 && (
//           <div className="text-center mt-8">
//             <button
//               onClick={() => window.location.href = '/opportunities'}
//               className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               View All Opportunities →
//             </button>
//           </div>
//         )}
//       </div>

//       {selectedOpportunity && (
//         <OpportunityModal
//           opportunity={selectedOpportunity}
//           onClose={() => setSelectedOpportunity(null)}
//         />
//       )}

//       {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpportunities } from '../redux/slices/opportunitySlice';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityModal from '../components/OpportunityModal';
import AuthModal from '../components/AuthModal';
import OpportunityForm from '../components/OpportunityForm';

const Home = () => {
  const dispatch = useDispatch();
  const { opportunities, loading, filters } = useSelector((state) => state.opportunities);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchOpportunities(filters));
  }, [dispatch, filters]);

  const handleCreateClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowCreateForm(true);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
      <Header 
        onAuthClick={() => setShowAuthModal(true)} 
        onCreateClick={handleCreateClick}
      />
      <Hero />

      <div id="search-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-8">
          <SearchBar onFilterToggle={() => setShowFilters(!showFilters)} />
          <FilterSection show={showFilters} />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading opportunities...</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No opportunities found. Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.slice(0, 6).map((opportunity, index) => (
              <OpportunityCard
                key={opportunity._id}
                opportunity={opportunity}
                onClick={setSelectedOpportunity}
                index={index}
              />
            ))}
          </div>
        )}

        {opportunities.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => window.location.href = '/opportunities'}
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Opportunities →
            </button>
          </div>
        )}
      </div>

      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      
      {showCreateForm && (
        <OpportunityForm onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
};

export default Home;