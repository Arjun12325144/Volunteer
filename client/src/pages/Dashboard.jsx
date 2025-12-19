import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/slices/authSlice';
import { fetchOpportunities } from '../redux/slices/opportunitySlice';
import Header from '../components/Header';
import { 
  Calendar, 
  Users, 
  Heart, 
  TrendingUp, 
  Clock,
  MapPin,
  Award,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { opportunities } = useSelector((state) => state.opportunities);
  const [stats, setStats] = useState({
    totalRegistered: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    totalHours: 0,
  });

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchOpportunities({}));
  }, [dispatch]);

  useEffect(() => {
    if (user?.registeredOpportunities) {
      const today = new Date();
      const upcoming = user.registeredOpportunities.filter(
        opp => new Date(opp.date) >= today
      ).length;
      const completed = user.registeredOpportunities.filter(
        opp => new Date(opp.date) < today
      ).length;

      setStats({
        totalRegistered: user.registeredOpportunities.length,
        upcomingEvents: upcoming,
        completedEvents: completed,
        totalHours: completed * 3, // Assuming 3 hours per event
      });
    }
  }, [user]);

  const upcomingOpportunities = user?.registeredOpportunities?.filter(
    opp => new Date(opp.date) >= new Date()
  ) || [];

  const recentOpportunities = opportunities.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your volunteer activity overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slideUp">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalRegistered}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Registered
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.upcomingEvents}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Upcoming Events
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.completedEvents}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Completed Events
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                <Clock className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalHours}h
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Hours
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Upcoming Events
              </h2>
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>

            {upcomingOpportunities.length > 0 ? (
              <div className="space-y-4">
                {upcomingOpportunities.map((opp, index) => (
                  <div
                    key={opp._id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-100 dark:border-gray-600 animate-fadeIn"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {opp.title}
                      </h3>
                      <span className="text-2xl">{opp.image || '🌟'}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {opp.organizationName}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(opp.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {opp.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No upcoming events. Explore new opportunities!
                </p>
              </div>
            )}
          </div>

          {/* Recommended Opportunities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recommended for You
              </h2>
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>

            <div className="space-y-4">
              {recentOpportunities.map((opp, index) => (
                <div
                  key={opp._id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer animate-fadeIn"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {opp.title}
                    </h3>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                      {opp.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {opp.organizationName}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      {opp.volunteers.current}/{opp.volunteers.required}
                    </div>
                    <button className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Impact Matters! 🌟</h2>
              <p className="text-purple-100">
                You've contributed {stats.totalHours} hours to making a difference in your community.
              </p>
            </div>
            <div className="hidden md:block text-6xl">
              🎯
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;