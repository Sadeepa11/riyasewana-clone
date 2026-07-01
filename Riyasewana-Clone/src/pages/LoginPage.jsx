import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { SAMPLE_USERS } from '../hooks/useAuth';
import PasswordField from '../components/PasswordField';
import FormField from '../components/FormField';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    const ok = login(form.email, form.password);
    if (!ok) {
      setError('Invalid email or password.');
      return;
    }
    navigate('/account');
  };

  return (
    <div className="py-10 min-h-[60vh] flex items-start justify-center">
      <div className="page-container w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="card p-8 max-w-md mx-auto"
        >
          <h1 className="text-[22px] font-bold text-gray-800 text-center mb-1">Account Log In</h1>
          <p className="text-[13px] text-gray-500 text-center mb-6">Log in to post and manage your vehicle ads</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormField label="Username or Email" required>
              <input
                type="text"
                className="form-input"
                value={form.email}
                onChange={set('email')}
                autoComplete="email"
              />
            </FormField>

            <PasswordField
              label="Password"
              required
              value={form.password}
              onChange={set('password')}
              name="password"
            />

            <button type="submit" className="btn-blue w-full py-3 text-[15px] mt-2">
              Log In
            </button>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#00b4d8]"
                />
                <span className="text-[13px] text-gray-600">Remember me next time</span>
              </label>
            </div>

            <div className="text-center mt-3">
              <a href="#" className="text-[13px] text-[#00b4d8] hover:underline">
                Forgot password or username?
              </a>
            </div>
          </form>

          <div className="border-t border-gray-200 mt-6 pt-4 text-center">
            <p className="text-[13px] text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-[#00b4d8] font-semibold hover:underline">
                Register Free
              </Link>
            </p>
          </div>

          <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-[11px] font-semibold text-gray-500 mb-2">Sample Logins</p>
            {SAMPLE_USERS.map(u => (
              <div key={u.email} className="flex justify-between text-[12px] text-gray-600 py-0.5">
                <span>{u.email}</span>
                <span className="font-mono text-gray-400">{u.password}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
