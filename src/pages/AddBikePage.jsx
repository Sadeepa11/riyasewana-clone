import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import UserAccountBar from '../components/UserAccountBar';
import FormField from '../components/FormField';
import PhotoUpload from '../components/PhotoUpload';
import { BIKE_MAKES, CONDITIONS, YEARS } from '../data/makes';
import { CITIES } from '../data/cities';

const START_TYPES = ['Kick Start', 'Self Start', 'Both'];

export default function AddBikePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    condition: '', make: '', model: '', year: '',
    price: '', engineCC: '', ongoingLease: false,
    startType: '', mileage: '0', description: '',
  });

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  if (!user) {
    return (
      <div className="py-16 text-center page-container">
        <p className="text-gray-600 mb-4">Please log in to post an ad.</p>
        <Link to="/login" className="btn-blue inline-block">Log In</Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="page-container max-w-3xl">
        <UserAccountBar />

        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded px-4 py-2.5 mb-5 text-[13px] text-yellow-800">
          <AlertCircle size={16} className="shrink-0" />
          All registered vehicle ads are free. Unregistered vehicles are subject to a fee.
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Contact Info */}
          <div className="card p-5 mb-4">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Contact Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Name" required>
                <input type="text" className="form-input" defaultValue={user.name} />
              </FormField>
              <FormField label="Phone Number" required hint="10 digits, mobile numbers only">
                <input type="tel" className="form-input" defaultValue={user.phone} maxLength={10} />
              </FormField>
            </div>
            <FormField label="City" required>
              <select className="form-select" defaultValue={user.city}>
                <option value="">Select City</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
          </div>

          {/* Bike Info */}
          <div className="card p-5 mb-4">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Bike Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Vehicle Type">
                <input type="text" className="form-input bg-gray-50" defaultValue="Motorcycle" readOnly />
              </FormField>
              <FormField label="Condition" required>
                <select className="form-select" value={form.condition} onChange={set('condition')}>
                  <option value="">Select Condition</option>
                  {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                </select>
              </FormField>
              <FormField label="Make" required>
                <input
                  type="text" className="form-input"
                  placeholder="Search make..."
                  list="bike-makes-list"
                  value={form.make} onChange={set('make')}
                />
                <datalist id="bike-makes-list">
                  {BIKE_MAKES.map(m => <option key={m} value={m} />)}
                </datalist>
              </FormField>
              <FormField label="Model" required>
                <input type="text" className="form-input" placeholder="Type or select model..." value={form.model} onChange={set('model')} />
              </FormField>
            </div>
            <FormField label="Manufactured Year" required>
              <select className="form-select" value={form.year} onChange={set('year')}>
                <option value="">Select Year</option>
                {YEARS.map(y => <option key={y}>{y}</option>)}
              </select>
            </FormField>
          </div>

          {/* Details */}
          <div className="card p-5 mb-4">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Price (Rs.)">
                <input type="number" className="form-input" value={form.price} onChange={set('price')} />
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.ongoingLease}
                    onChange={e => setForm(p => ({ ...p, ongoingLease: e.target.checked }))}
                    className="accent-[#00b4d8]"
                  />
                  <span className="text-[12px] text-gray-600">Ongoing Lease</span>
                </label>
              </FormField>
              <FormField label="Engine (CC)">
                <input type="number" className="form-input" value={form.engineCC} onChange={set('engineCC')} />
              </FormField>
              <FormField label="Start Type" required>
                <select className="form-select" value={form.startType} onChange={set('startType')}>
                  <option value="">Select Start Type</option>
                  {START_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </FormField>
              <FormField label="Mileage (KM)" required>
                <input type="number" className="form-input" value={form.mileage} onChange={set('mileage')} />
              </FormField>
            </div>
          </div>

          {/* Description */}
          <div className="card p-5 mb-4">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Description</h3>
            <textarea
              className="form-input min-h-[100px] resize-y"
              placeholder="Add any additional details about your bike..."
              value={form.description}
              onChange={set('description')}
            />
            <p className="text-[11px] text-gray-400 mt-1">Put correct address and land phone number if you own a shop.</p>
          </div>

          {/* Photos */}
          <div className="card p-5 mb-6">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Photos</h3>
            <PhotoUpload maxPhotos={11} label="Add Photos" hint="Up to 11 photos. First photo is the main image." />
          </div>

          <button onClick={() => navigate('/account')} className="btn-green w-full py-3.5 text-[16px]">
            Add Bike
          </button>
        </motion.div>
      </div>
    </div>
  );
}
