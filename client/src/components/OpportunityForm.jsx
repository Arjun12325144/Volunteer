import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, FileText, Tag, Building } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { opportunityAPI } from '../services/api';
import { fetchOpportunities } from '../redux/slices/opportunitySlice';

const categories = ['Environment', 'Community Service', 'Animal Welfare', 'Education', 'Healthcare'];

const OpportunityForm = ({ onClose, opportunity = null }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: opportunity?.title || '',
    description: opportunity?.description || '',
    organizationName: opportunity?.organizationName || '',
    category: opportunity?.category || 'Environment',
    location: opportunity?.location || '',
    date: opportunity?.date ? new Date(opportunity.date).toISOString().split('T')[0] : '',
    time: opportunity?.time || '',
    duration: opportunity?.duration || '',
    volunteersRequired: opportunity?.volunteers?.required || '',
    skills: opportunity?.skills?.join(', ') || '',
    image: opportunity?.image || '🌟',
  });

  const emojiOptions = ['🌟', '🌍', '🌊', '🌱', '🐾', '🍎', '📚', '💝', '🎨', '🏥', '🏃', '🎭', '🎵', '🏗️', '🚀'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const opportunityData = {
        title: formData.title,
        description: formData.description,
        organizationName: formData.organizationName,
        category: formData.category,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        volunteers: {
          current: opportunity?.volunteers?.current || 0,
          required: parseInt(formData.volunteersRequired)
        },
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        image: formData.image,
        organization: user?.organizationId || '6751234567890abcdef12345', // Placeholder
      };

      if (opportunity) {
        await opportunityAPI.update(opportunity._id, opportunityData);
      } else {
        await opportunityAPI.create(opportunityData);
      }

      dispatch(fetchOpportunities({}));
      onClose();
      alert(opportunity ? 'Opportunity updated successfully!' : 'Opportunity created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save opportunity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="max-w-3xl w-full rounded-3xl shadow-2xl p-8 my-8 bg-white dark:bg-gray-800 animate-slideUp max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {opportunity ? 'Edit Opportunity' : 'Create New Opportunity'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Choose an Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: emoji })}
                  className={`text-3xl p-3 rounded-xl transition-all ${
                    formData.image === emoji
                      ? 'bg-purple-100 dark:bg-purple-900/30 scale-110 ring-2 ring-purple-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:scale-105'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Opportunity Title *
            </label>
            <FileText className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="title"
              placeholder="e.g., Beach Cleanup Drive"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Description *
            </label>
            <textarea
              name="description"
              placeholder="Describe the opportunity and what volunteers will do..."
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none resize-none"
            />
          </div>

          {/* Organization Name */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Organization Name *
            </label>
            <Building className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="organizationName"
              placeholder="e.g., Ocean Conservation Society"
              value={formData.organizationName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Category *
            </label>
            <Tag className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Location *
            </label>
            <MapPin className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="e.g., Santa Monica Beach"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Date *
              </label>
              <Calendar className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Time *
              </label>
              <Clock className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="time"
                placeholder="e.g., 9:00 AM - 12:00 PM"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          {/* Duration and Volunteers Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Duration
              </label>
              <Clock className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="duration"
                placeholder="e.g., 3 hours"
                value={formData.duration}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Volunteers Needed *
              </label>
              <Users className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="volunteersRequired"
                placeholder="e.g., 50"
                value={formData.volunteersRequired}
                onChange={handleChange}
                required
                min="1"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              placeholder="e.g., Physical fitness, Teamwork, Communication"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : opportunity ? 'Update Opportunity' : 'Create Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityForm;