import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import UserAccountBar from '../components/UserAccountBar';
import FormField from '../components/FormField';
import PhotoUpload from '../components/PhotoUpload';
import { CONDITIONS, PART_CATEGORIES, PART_USED_IN } from '../data/makes';
import { CITIES } from '../data/cities';

export default function AddPartsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    condition: '', usedIn: 'All', category: '',
    partName: '', price: '', description: '',
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

          {/* Part Info */}
          <div className="card p-5 mb-4">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Part / Accessory Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Condition" required>
                <select className="form-select" value={form.condition} onChange={set('condition')}>
                  <option value="">Select Condition</option>
                  {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                </select>
              </FormField>
              <FormField label="Part Used In" required>
                <select className="form-select" value={form.usedIn} onChange={set('usedIn')}>
                  {PART_USED_IN.map(u => <option key={u}>{u}</option>)}
                </select>
              </FormField>
            </div>
            <FormField label="Part Category" required>
              <select className="form-select" value={form.category} onChange={set('category')}>
                <option value="">Select Category</option>
                {PART_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Part Name and Brand" required hint="Include both the brand/make name and the part name">
              <input type="text" className="form-input" value={form.partName} onChange={set('partName')} />
            </FormField>
            <FormField label="Price (Rs.)" hint="Leave blank for negotiable">
              <input type="number" className="form-input" value={form.price} onChange={set('price')} />
            </FormField>
          </div>

          {/* Description */}
          <div className="card p-5 mb-4">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Description</h3>
            <textarea
              className="form-input min-h-[100px] resize-y"
              placeholder="Add any additional details about your part..."
              value={form.description}
              onChange={set('description')}
            />
            <p className="text-[11px] text-gray-400 mt-1">Put correct address and land phone number if you own a shop.</p>
          </div>

          {/* Photos */}
          <div className="card p-5 mb-6">
            <h3 className="font-bold text-gray-700 text-[14px] mb-4 pb-2 border-b border-gray-100">Photos</h3>
            <PhotoUpload maxPhotos={6} label="Add Photos" hint="Up to 6 photos. First photo is the main image." />
          </div>

          <button onClick={() => navigate('/account')} className="btn-green w-full py-3.5 text-[16px]">
            Add Part / Accessory
          </button>
        </motion.div>
      </div>
    </div>
  );
}
