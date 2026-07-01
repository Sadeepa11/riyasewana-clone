import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import PasswordField from '../components/PasswordField';

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ old: '', newPass: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.old) { setError('Enter your current password.'); return; }
    if (form.newPass.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (form.newPass !== form.confirm) { setError('Passwords do not match.'); return; }
    setSuccess(true);
    setForm({ old: '', newPass: '', confirm: '' });
    setTimeout(() => setSuccess(false), 3000);
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
            <Link to="/editprofile" className="text-[#00b4d8] hover:underline">Edit Profile</Link>
            <span className="text-gray-300">·</span>
            <Link to="/account" className="text-[#00b4d8] hover:underline">My Ads</Link>
            <span className="text-gray-300">·</span>
            <Link to="/account" className="text-[#00b4d8] hover:underline">Logout</Link>
          </div>

          <h1 className="text-[22px] font-bold text-gray-800 text-center mb-6">Change Password</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded px-3 py-2 mb-4">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-[13px] rounded px-3 py-2 mb-4 text-center">
              Password changed successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <PasswordField label="Old Password" required value={form.old} onChange={set('old')} name="old" />
            <PasswordField label="New Password" required value={form.newPass} onChange={set('newPass')} name="newPass" />
            <PasswordField label="Re-enter New Password" required value={form.confirm} onChange={set('confirm')} name="confirm" />

            <button type="submit" className="btn-blue w-full py-3 text-[15px] mt-2">
              Change Password
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
