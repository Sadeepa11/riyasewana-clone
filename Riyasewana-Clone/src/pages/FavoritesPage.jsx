import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import UserAccountBar from '../components/UserAccountBar';

export default function FavoritesPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="py-16 text-center page-container">
        <p className="text-gray-600 mb-4">Please log in to see your saved favorites.</p>
        <Link to="/login" className="btn-blue inline-block">Log In</Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="page-container">
        <UserAccountBar />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card py-20 text-center"
        >
          <Heart className="mx-auto text-gray-200 mb-4" size={52} strokeWidth={1.5} />
          <p className="text-[14px] text-gray-500">You have no saved favorites yet.</p>
          <p className="text-[13px] text-gray-400 mt-1">Browse ads and tap the heart icon to save them here.</p>
          <Link to="/search" className="text-[#00b4d8] text-[13px] hover:underline mt-4 block">
            Browse Vehicles →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
