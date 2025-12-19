// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOpportunities } from '../redux/slices/opportunitySlice';
// import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';
// import FilterSection from '../components/FilterSection';
// import OpportunityCard from '../components/OpportunityCard';
// import OpportunityModal from '../components/OpportunityModal';
// import OpportunityForm from '../components/OpportunityForm';
// import AuthModal from '../components/AuthModal';
// import { Filter, Grid, List } from 'lucide-react';

// const Opportunities = () => {
//   const dispatch = useDispatch();
//   const { opportunities, loading, filters } = useSelector((state) => state.opportunities);
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedOpportunity, setSelectedOpportunity] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [sortBy, setSortBy] = useState('date'); // 'date', 'volunteers', 'title'

//   useEffect(() => {
//     dispatch(fetchOpportunities(filters));
//   }, [dispatch, filters]);

//   const handleCreateClick = () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       return;
//     }
//     setShowCreateForm(true);
//   };

//   // Sort opportunities
//   const sortedOpportunities = [...opportunities].sort((a, b) => {
//     switch (sortBy) {
//       case 'date':
//         return new Date(a.date) - new Date(b.date);
//       case 'volunteers':
//         return (b.volunteers.required - b.volunteers.current) - (a.volunteers.required - a.volunteers.current);
//       case 'title':
//         return a.title.localeCompare(b.title);
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
//       <Header 
//         onAuthClick={() => setShowAuthModal(true)}
//         onCreateClick={handleCreateClick}
//       />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Page Header */}
//         <div className="mb-8 animate-fadeIn">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//             Explore Opportunities
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400">
//             Find the perfect volunteer opportunity that matches your passion and schedule.
//           </p>
//         </div>

//         {/* Search and Controls */}
//         <div className="mb-8 space-y-4">
//           <SearchBar onFilterToggle={() => setShowFilters(!showFilters)} />
//           <FilterSection show={showFilters} />

//           {/* View Controls */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-slideUp">
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {sortedOpportunities.length} opportunities found
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* Sort Dropdown */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm focus:border-purple-500 outline-none"
//                 >
//                   <option value="date">Date</option>
//                   <option value="volunteers">Spots Available</option>
//                   <option value="title">Title (A-Z)</option>
//                 </select>
//               </div>

//               {/* View Toggle */}
//               <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === 'grid'
//                       ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow'
//                       : 'text-gray-600 dark:text-gray-400'
//                   }`}
//                 >
//                   <Grid className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === 'list'
//                       ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow'
//                       : 'text-gray-600 dark:text-gray-400'
//                   }`}
//                 >
//                   <List className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Opportunities Display */}
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading opportunities...</p>
//           </div>
//         ) : sortedOpportunities.length === 0 ? (
//           <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
//             <Filter className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//             <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
//               No opportunities found
//             </p>
//             <p className="text-sm text-gray-500 dark:text-gray-500">
//               Try adjusting your filters or search terms
//             </p>
//           </div>
//         ) : (
//           <div className={viewMode === 'grid' 
//             ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
//             : 'space-y-4'
//           }>
//             {sortedOpportunities.map((opportunity, index) => (
//               viewMode === 'grid' ? (
//                 <OpportunityCard
//                   key={opportunity._id}
//                   opportunity={opportunity}
//                   onClick={setSelectedOpportunity}
//                   index={index}
//                 />
//               ) : (
//                 <div
//                   key={opportunity._id}
//                   onClick={() => setSelectedOpportunity(opportunity)}
//                   style={{ animationDelay: `${index * 0.05}s` }}
//                   className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fadeIn"
//                 >
//                   <div className="flex flex-col md:flex-row gap-6">
//                     <div className="text-6xl flex-shrink-0">{opportunity.image}</div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
//                           {opportunity.title}
//                         </h3>
//                         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white whitespace-nowrap ml-2">
//                           {opportunity.category}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         {opportunity.organizationName}
//                       </p>
//                       <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
//                         {opportunity.description}
//                       </p>
//                       <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
//                         <span className="flex items-center gap-1">
//                           📅 {new Date(opportunity.date).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric',
//                             year: 'numeric'
//                           })}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           ⏰ {opportunity.time}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           📍 {opportunity.location}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           👥 {opportunity.volunteers.current}/{opportunity.volunteers.required}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       {selectedOpportunity && (
//         <OpportunityModal
//           opportunity={selectedOpportunity}
//           onClose={() => setSelectedOpportunity(null)}
//         />
//       )}

//       {showCreateForm && (
//         <OpportunityForm onClose={() => setShowCreateForm(false)} />
//       )}

//       {showAuthModal && (
//         <AuthModal onClose={() => setShowAuthModal(false)} />
//       )}
//     </div>
//   );
// };

// export default Opportunities;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpportunities } from '../redux/slices/opportunitySlice';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityModal from '../components/OpportunityModal';
import OpportunityForm from '../components/OpportunityForm';  // Make sure this is imported
import AuthModal from '../components/AuthModal';
import { Filter, Grid, List } from 'lucide-react';

const Opportunities = () => {
  const dispatch = useDispatch();
  const { opportunities, loading, filters } = useSelector((state) => state.opportunities);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);  // Make sure this state exists
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    dispatch(fetchOpportunities(filters));
  }, [dispatch, filters]);

  const handleCreateClick = () => {
    console.log('Create clicked, isAuthenticated:', isAuthenticated); // Debug log
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowCreateForm(true);
    console.log('showCreateForm set to true'); // Debug log
  };

  // Sort opportunities
  const sortedOpportunities = [...opportunities].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'volunteers':
        return (b.volunteers.required - b.volunteers.current) - (a.volunteers.required - a.volunteers.current);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
      <Header 
        onAuthClick={() => setShowAuthModal(true)}
        onCreateClick={handleCreateClick}  // Pass the handler
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Opportunities
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find the perfect volunteer opportunity that matches your passion and schedule.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <SearchBar onFilterToggle={() => setShowFilters(!showFilters)} />
          <FilterSection show={showFilters} />

          {/* View Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-slideUp">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {sortedOpportunities.length} opportunities found
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm focus:border-purple-500 outline-none"
                >
                  <option value="date">Date</option>
                  <option value="volunteers">Spots Available</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunities Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading opportunities...</p>
          </div>
        ) : sortedOpportunities.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <Filter className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              No opportunities found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {sortedOpportunities.map((opportunity, index) => (
              viewMode === 'grid' ? (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                  onClick={setSelectedOpportunity}
                  index={index}
                />
              ) : (
                <div
                  key={opportunity._id}
                  onClick={() => setSelectedOpportunity(opportunity)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fadeIn"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="text-6xl flex-shrink-0">{opportunity.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {opportunity.title}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white whitespace-nowrap ml-2">
                          {opportunity.category}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {opportunity.organizationName}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                        {opportunity.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          📅 {new Date(opportunity.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          ⏰ {opportunity.time}
                        </span>
                        <span className="flex items-center gap-1">
                          📍 {opportunity.location}
                        </span>
                        <span className="flex items-center gap-1">
                          👥 {opportunity.volunteers.current}/{opportunity.volunteers.required}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Modals - MAKE SURE THESE ARE AT THE BOTTOM */}
      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}

      {showCreateForm && (
        <OpportunityForm 
          onClose={() => {
            setShowCreateForm(false);
            console.log('Form closed'); // Debug log
          }} 
        />
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Opportunities;