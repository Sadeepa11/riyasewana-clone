import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import FormField from '../components/FormField';
import { CITIES } from '../data/cities';

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
  });
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) {
    return (
      <div className="py-16 text-center page-container">
        <p className="text-gray-600 mb-4">Please log in first.</p>
        <Link to="/login" className="btn-blue inline-block">Log In</Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 max-w-lg mx-auto"
        >
          <div className="flex justify-center gap-4 mb-6 text-[13px]">
            <Link to="/changepass" className="text-[#00b4d8] hover:underline">Change Password</Link>
            <span className="text-gray-300">·</span>
            <Link to="/account" className="text-[#00b4d8] hover:underline">My Ads</Link>
            <span className="text-gray-300">·</span>
            <Link to="/account" className="text-[#00b4d8] hover:underline">Logout</Link>
          </div>

          <h1 className="text-[22px] font-bold text-gray-800 text-center mb-6">Edit Profile</h1>

          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-[13px] rounded px-3 py-2 mb-4 text-center">
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormField label="Username">
              <input
                type="text"
                className="form-input bg-gray-50 text-gray-500 cursor-not-allowed"
                value={user.email}
                readOnly
              />
              <p className="text-[11px] text-gray-400 mt-0.5">Cannot be changed</p>
            </FormField>

            <FormField label="Full Name" required>
              <input type="text" className="form-input" value={form.name} onChange={set('name')} />
            </FormField>

            <FormField label="Phone Number" required hint="10 digits, e.g. 0771234567">
              <input
                type="tel"
                className="form-input"
                value={form.phone}
                onChange={set('phone')}
                maxLength={10}
              />
            </FormField>

            <FormField label="City" required>
              <select className="form-select" value={form.city} onChange={set('city')}>
                <option value="">Select City</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>

            <button type="submit" className="btn-green w-full py-3 text-[15px] mt-2">
              Update Profile
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
