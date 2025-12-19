import React, { useState, useEffect } from 'react';
import { organizationAPI } from '../services/api';
import Header from '../components/Header';
import OrganizationForm from '../components/OrganizationForm';  // Import this
import { Building, Mail, Phone, MapPin, Globe, CheckCircle, Search } from 'lucide-react';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOrgForm, setShowOrgForm] = useState(false);  // ADD THIS STATE

  const categories = ['All', 'Environment', 'Community Service', 'Animal Welfare', 'Education', 'Healthcare'];

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await organizationAPI.getAll();
      setOrganizations(response.data.organizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter organizations
  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Our Partner Organizations
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover the amazing organizations making a difference in our community.
              </p>
            </div>
            
            {/* ADD REGISTER BUTTON HERE */}
            <button
              onClick={() => setShowOrgForm(true)}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Register Your Organization
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Organizations Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading organizations...</p>
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <Building className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No organizations found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org, index) => (
              <div
                key={org._id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fadeIn"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Building className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  {org.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Organization Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {org.name}
                </h3>

                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold mb-3">
                  {org.category}
                </span>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {org.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{org.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{org.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{org.address}</span>
                  </div>
                  {org.website && (
                    <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                      <Globe className="w-4 h-4" />
                      <a 
                        href={org.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button className="w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD MODAL AT THE END - BEFORE CLOSING MAIN DIV */}
      {showOrgForm && (
        <OrganizationForm 
          onClose={() => setShowOrgForm(false)}
          onSuccess={fetchOrganizations}
        />
      )}
    </div>
  );
};

export default Organizations;