import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Bike, Wrench, Recycle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import UserAccountBar from '../components/UserAccountBar';

const SELL_OPTIONS = [
  { label: 'Sell Vehicle', icon: <Car size={16} />, to: '/add-vehicle', color: 'border-l-[#f47920]' },
  { label: 'Sell Motorbike', icon: <Bike size={16} />, to: '/add-bike', color: 'border-l-[#00b4d8]' },
  { label: 'Sell Parts', icon: <Wrench size={16} />, to: '/add-parts', color: 'border-l-[#22c55e]' },
  { label: 'Sell Bicycle', icon: <Recycle size={16} />, to: '/add-bicycle', color: 'border-l-[#8b5cf6]' },
];

export default function AccountPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="py-16 text-center page-container">
        <p className="text-gray-600 mb-4">Please log in to access your account.</p>
        <Link to="/login" className="btn-blue inline-block">Log In</Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="page-container">
        <UserAccountBar />

        {/* Sell buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          {SELL_OPTIONS.map(opt => (
            <Link
              key={opt.label}
              to={opt.to}
              className={`card p-3 flex items-center gap-2 text-[13px] font-semibold text-gray-700 hover:text-[#00b4d8] transition-colors border-l-4 ${opt.color} hover:shadow-md`}
            >
              {opt.icon} {opt.label}
            </Link>
          ))}
        </motion.div>

        {/* Empty state */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card py-16 text-center"
        >
          <p className="text-[14px] text-gray-500 mb-3">You currently have no ads in your account.</p>
          <Link to="/add-vehicle" className="text-[#00b4d8] text-[13px] hover:underline">
            Post your first ad →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
