import React from 'react';
import { X, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpForOpportunity } from '../redux/slices/opportunitySlice';

const OpportunityModal = ({ opportunity, onClose }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleSignUp = async () => {
    if (!isAuthenticated) {
      alert('Please login to sign up for opportunities');
      return;
    }

    try {
      await dispatch(signUpForOpportunity(opportunity._id)).unwrap();
      alert('Successfully signed up!');
      onClose();
    } catch (error) {
      alert(error.message || 'Failed to sign up');
    }
  };

  const isRegistered = user && opportunity.registeredVolunteers?.includes(user.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="max-w-2xl w-full rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto animate-slideUp bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div className="text-6xl">{opportunity.image}</div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {opportunity.title}
        </h2>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
          {opportunity.organizationName}
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {new Date(opportunity.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300">{opportunity.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {opportunity.volunteers.current}/{opportunity.volunteers.required} volunteers signed up
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            About This Opportunity
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{opportunity.description}</p>
        </div>

        <button
          onClick={handleSignUp}
          disabled={isRegistered}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
            isRegistered
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
          }`}
        >
          {isRegistered ? 'Already Registered' : 'Sign Up to Volunteer'}
        </button>
      </div>
    </div>
  );
};

export default OpportunityModal;