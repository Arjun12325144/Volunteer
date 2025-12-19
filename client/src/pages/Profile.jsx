import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/slices/authSlice';
import Header from '../components/Header';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-fadeIn">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Volunteer Member</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
              <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.phone}</p>
                </div>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {user.availability || 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Registered Opportunities
            </h2>
            {user.registeredOpportunities?.length > 0 ? (
              <div className="space-y-3">
                {user.registeredOpportunities.map((opp) => (
                  <div
                    key={opp._id}
                    className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-600"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {opp.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {opp.organizationName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                You haven't registered for any opportunities yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;