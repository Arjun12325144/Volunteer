import React, { useState } from 'react';
import { X, Building, Mail, Phone, MapPin, Globe, FileText, Tag } from 'lucide-react';
import { organizationAPI } from '../services/api';

const categories = ['Environment', 'Community Service', 'Animal Welfare', 'Education', 'Healthcare'];

const OrganizationForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    category: 'Environment',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await organizationAPI.create(formData);
      alert('Organization created successfully! It will be reviewed by our team.');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="max-w-2xl w-full rounded-3xl shadow-2xl p-8 my-8 bg-white dark:bg-gray-800 animate-slideUp max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Register Your Organization
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
          {/* Organization Name */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Organization Name *
            </label>
            <Building className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="e.g., Ocean Conservation Society"
              value={formData.name}
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
              placeholder="Tell us about your organization's mission and work..."
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none resize-none"
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

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <Mail className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="contact@organization.org"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Phone *
            </label>
            <Phone className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Address *
            </label>
            <MapPin className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="123 Main St, City, State"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Website */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Website (Optional)
            </label>
            <Globe className="absolute left-3 top-11 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="website"
              placeholder="https://www.organization.org"
              value={formData.website}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 outline-none"
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
              className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationForm;