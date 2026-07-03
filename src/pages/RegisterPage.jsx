import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import { CITIES } from '../data/cities';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '', password: '', repassword: '',
    name: '', phone: '', city: '',
  });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    if (form.password !== form.repassword) e.repassword = 'Passwords do not match';
    if (!form.name) e.name = 'Name is required';
    if (!form.phone) e.phone = 'Phone is required';
    if (form.phone && form.phone.length < 10) e.phone = 'Enter a valid 10-digit phone number';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    register({ email: form.email, name: form.name, phone: form.phone, city: form.city });
    navigate('/account');
  };

  return (
    <div className="py-10 flex items-start justify-center">
      <div className="page-container w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="card p-8 max-w-md mx-auto"
        >
          <h1 className="text-[22px] font-bold text-gray-800 text-center mb-1">Create Free Account</h1>
          <p className="text-[13px] text-gray-500 text-center mb-6">
            Advertise your vehicle free on Sri Lanka&apos;s largest marketplace
          </p>

          <form onSubmit={handleSubmit}>
            <FormField label="Email" required error={errors.email}>
              <input type="email" className="form-input" value={form.email} onChange={set('email')} />
            </FormField>

            <PasswordField
              label="Password" required
              value={form.password} onChange={set('password')}
              name="password" error={errors.password}
            />

            <PasswordField
              label="Re-enter Password" required
              value={form.repassword} onChange={set('repassword')}
              name="repassword" error={errors.repassword}
            />
            {form.password && form.repassword && form.password === form.repassword && (
              <p className="text-[11px] text-green-600 -mt-3 mb-3">Passwords match</p>
            )}

            <FormField label="Name" required error={errors.name}>
              <input type="text" className="form-input" value={form.name} onChange={set('name')} />
            </FormField>

            <FormField
              label="Phone Number" required
              hint="10 digits, e.g. 07xxxxxxxx — a valid phone number"
              error={errors.phone}
            >
              <input
                type="tel"
                className="form-input"
                value={form.phone}
                onChange={set('phone')}
                maxLength={10}
              />
            </FormField>

            <FormField label="City">
              <select className="form-select" value={form.city} onChange={set('city')}>
                <option value="">Select City</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>

            <button type="submit" className="btn-green w-full py-3 text-[15px] mt-2">
              Register Free
            </button>

            <p className="text-[12px] text-gray-400 text-center mt-3">
              By registering you agree to our{' '}
              <Link to="/terms" className="text-[#00b4d8] hover:underline">Terms &amp; Conditions</Link>
            </p>

            <p className="text-[13px] text-center mt-4">
              Already a member?{' '}
              <Link to="/login" className="text-[#00b4d8] font-semibold hover:underline">Log in here</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
