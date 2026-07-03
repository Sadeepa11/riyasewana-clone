import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { VEHICLES } from '../data/vehicles';
import { TYPE_ICON } from '../data/categories';

function fmtPrice(n) {
  return n ? `Rs. ${n.toLocaleString('en-LK')}` : 'Negotiable';
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = VEHICLES.find(v => v.id === Number(id));
  const [saved, setSaved] = useState(false);

  if (!vehicle) {
    return (
      <div className="page-container py-8 text-center">
        <p className="text-gray-500">Vehicle not found.</p>
        <Link to="/search" className="text-[#0284c7] text-sm hover:underline mt-2 block">Back to search</Link>
      </div>
    );
  }

  const related = VEHICLES.filter(v => v.make === vehicle.make && v.id !== vehicle.id).slice(0, 4);

  return (
    <div className="py-4">
      <div className="page-container">
        <div className={`vmore-content${vehicle.featured ? ' promoted-page' : ''}`}>

          <button className="back-link" onClick={() => navigate(-1)}>← Back to results</button>

          {vehicle.featured && (
            <div className="premium-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M2 8l4.5 1L12 3l5.5 6L22 8l-1.5 7H3.5L2 8z" fill="#f59e0b"/>
                <path d="M3.5 15h17v2.5a1 1 0 01-1 1h-15a1 1 0 01-1-1V15z" fill="#d97706"/>
                <circle cx="8" cy="11.5" r="1" fill="#fff"/>
                <circle cx="12" cy="10.5" r="1" fill="#fff"/>
                <circle cx="16" cy="11.5" r="1" fill="#fff"/>
              </svg>
              Promoted Ad
            </div>
          )}

          <div className="vmore-title">
            <h1>{vehicle.title} {vehicle.condition && `(${vehicle.condition})`}</h1>
            <div className="seller-info">
              Posted by {vehicle.seller} · {fmtDate(vehicle.date)}, {vehicle.city}
            </div>
          </div>

          {/* Gallery placeholder */}
          <div className="dt-gallery">
            <div className="dt-gallery-main">
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: vehicle.color || '#e8f0f8' }}>
                {TYPE_ICON[vehicle.type]
                  ? <img src={TYPE_ICON[vehicle.type]} alt={vehicle.type} style={{ width: 140, height: 140, objectFit: 'contain', opacity: 0.55 }} />
                  : <svg viewBox="0 0 120 75" fill="none" style={{ width: 160, height: 100, opacity: 0.3 }}>
                      <path d="M12 57h96M15 57l9-24h57l9 24" stroke="#374151" strokeWidth="4" strokeLinejoin="round"/>
                      <path d="M26 33l7.5-15h54l7.5 15" stroke="#374151" strokeWidth="3.5" strokeLinejoin="round"/>
                      <circle cx="30" cy="63" r="7" fill="#374151" opacity="0.6"/>
                      <circle cx="90" cy="63" r="7" fill="#374151" opacity="0.6"/>
                    </svg>
                }
              </div>
              <div className="dt-gallery-counter">1 / 1</div>
            </div>
          </div>

          {/* Quick specs */}
          <div className="quick-specs">
            {vehicle.year && (
              <span className="qspec">
                <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg>
                {vehicle.year}
              </span>
            )}
            {vehicle.mileage != null && (
              <span className="qspec">
                <svg viewBox="0 0 24 24"><path d="M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.85l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-.27-10.44zM10.59 15.41a2 2 0 002.83 0l5.66-8.49-8.49 5.66a2 2 0 000 2.83z"/></svg>
                {Number(vehicle.mileage).toLocaleString('en-LK')} km
              </span>
            )}
            {vehicle.fuel && (
              <span className="qspec">
                <svg viewBox="0 0 24 24"><path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33a2.5 2.5 0 002.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 01-2 0V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 005 0V9c0-.69-.28-1.32-.73-1.77zM18 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM8 18v-4.5H6V18H4V5h8v13H8z"/></svg>
                {vehicle.fuel}
              </span>
            )}
            {vehicle.transmission && (
              <span className="qspec">
                <svg viewBox="0 0 24 24"><path d="M3 5h2v14H3zm4 0h2v6H7zm4 0h2v10h-2zm4 0h2v4h-2zm4 0h2v8h-2z"/></svg>
                {vehicle.transmission}
              </span>
            )}
          </div>

          {/* Price + Call */}
          <div className="price-card">
            <div className="price-section">
              <span className="price-label">Price</span>
              <div className="price-amount">{fmtPrice(vehicle.price)}</div>
            </div>
            <div className="price-section">
              <span className="price-label">Contact</span>
              <a className="call-btn" href="tel:0771234567">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
                </svg>
                077 123 4567
              </a>
            </div>
          </div>

          {/* Warning */}
          <div className="warn-card" role="alert">
            🚫 වාහන පරික්ෂාවට පෙර මුදල් ගෙවීමෙන් වලකින්න!
          </div>

          {/* Key specs table */}
          <div className="detail-card">
            <div className="detail-row"><span className="detail-label">Location</span><span className="detail-value">{vehicle.city}</span></div>
            {vehicle.year && <div className="detail-row"><span className="detail-label">Year</span><span className="detail-value">{vehicle.year}</span></div>}
            {vehicle.mileage != null && <div className="detail-row"><span className="detail-label">Mileage</span><span className="detail-value">{Number(vehicle.mileage).toLocaleString('en-LK')} km</span></div>}
            {vehicle.make && <div className="detail-row"><span className="detail-label">Make</span><span className="detail-value">{vehicle.make}</span></div>}
            {vehicle.model && <div className="detail-row"><span className="detail-label">Model</span><span className="detail-value">{vehicle.model}</span></div>}
            {vehicle.fuel && <div className="detail-row"><span className="detail-label">Fuel Type</span><span className="detail-value">{vehicle.fuel}</span></div>}
            {vehicle.transmission && <div className="detail-row"><span className="detail-label">Transmission</span><span className="detail-value">{vehicle.transmission}</span></div>}
            {vehicle.condition && <div className="detail-row"><span className="detail-label">Condition</span><span className="detail-value">{vehicle.condition}</span></div>}
            <div className="detail-row"><span className="detail-label">Ad Date</span><span className="detail-value">{fmtDate(vehicle.date)}</span></div>
          </div>

          {/* Description */}
          {vehicle.description && (
            <div className="more-card">
              <div className="more-card-title">More Details</div>
              <div className="more-card-body">{vehicle.description}</div>
            </div>
          )}

          {/* Views */}
          <div className="views-count">{(vehicle.id * 37 + 214) % 900 + 100} views</div>

          {/* Actions */}
          <div className="actions-bar">
            <button className="action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="#e1365d" strokeWidth="2">
                <path d="M12 9v4m0 4h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z" strokeLinecap="round"/>
              </svg>
              Report Ad
            </button>
            <button className="action-btn" onClick={() => setSaved(s => !s)}>
              <span style={{ fontSize: 18 }}>{saved ? '★' : '☆'}</span>
              {saved ? 'Saved' : 'Save Ad to Favourite'}
            </button>
          </div>

          {/* Share */}
          <div className="share-card">
            <div className="share-title">Share this ad</div>
            <div className="share-btns">
              <a className="share-btn" href={`whatsapp://send?text=${encodeURIComponent(window.location.href)}`} title="WhatsApp">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a className="share-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a className="share-btn" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(vehicle.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" title="X">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Related links */}
          {related.length > 0 && (
            <div className="related-card">
              {related.map(v => (
                <Link key={v.id} to={`/vehicle/${v.id}`}>{v.title} — {v.city}</Link>
              ))}
              <Link to={`/search?make=${vehicle.make}&type=${vehicle.type}`}>
                More {vehicle.make} {vehicle.type} in Sri Lanka
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
