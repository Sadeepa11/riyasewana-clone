import { Link } from 'react-router-dom';
import { MapPin, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { TYPE_ICON } from '../data/categories';

function relativeDate(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function VehicleCard({ vehicle }) {
  const fmtPrice = (n) => n ? `Rs. ${n.toLocaleString('en-LK')}` : 'Negotiable';
  const fmtMileage = (m) => (m != null && m !== '') ? `${Number(m).toLocaleString('en-LK')} km` : null;

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`v-card${vehicle.featured ? ' promoted' : ''}`}
    >
      <div className="v-card-img">
        <Link to={`/vehicle/${vehicle.id}`}>
          <div style={{ backgroundColor: vehicle.color || '#e8f0f8', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {TYPE_ICON[vehicle.type]
              ? <img src={TYPE_ICON[vehicle.type]} alt={vehicle.type} style={{ width: 64, height: 64, objectFit: 'contain', opacity: 0.6 }} />
              : <svg viewBox="0 0 80 50" fill="none" style={{ width: 64, height: 40, opacity: 0.4 }}>
                  <path d="M8 38h64M10 38l6-16h38l6 16" stroke="#374151" strokeWidth="3" strokeLinejoin="round"/>
                  <path d="M17 22l5-10h36l5 10" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round"/>
                  <circle cx="20" cy="42" r="5" fill="#374151" opacity="0.6"/>
                  <circle cx="60" cy="42" r="5" fill="#374151" opacity="0.6"/>
                </svg>
            }
          </div>
        </Link>
        {vehicle.featured && <span className="top-ribbon">TOP AD</span>}
      </div>

      <div className="v-card-body">
        <div className="v-card-title">
          <Link to={`/vehicle/${vehicle.id}`}>{vehicle.title}</Link>
        </div>

        <div className="v-card-price">{fmtPrice(vehicle.price)}</div>

        {vehicle.year && <div className="v-card-year">{vehicle.year}</div>}

        <div className="v-card-meta">
          <MapPin size={13} />
          <span>{vehicle.city}</span>
          {fmtMileage(vehicle.mileage) && (
            <>
              <span className="v-sep">·</span>
              <Gauge size={13} />
              <span>{fmtMileage(vehicle.mileage)}</span>
            </>
          )}
        </div>

        <div className="v-card-date">
          <span>{relativeDate(vehicle.date)}</span>
        </div>
      </div>
    </motion.li>
  );
}
