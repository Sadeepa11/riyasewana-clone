import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';

/* ── Mobile menu items (matches riyasewana.com) ──────────────────── */
const MENU_ITEMS = [
  { emoji: '🏠', label: 'Home',                      to: '/' },
  { emoji: '➕', label: 'Post Free Ad',               to: '/register' },
  { emoji: '🔑', label: 'Login',                      to: '/login', guestOnly: true },
  { emoji: '👤', label: 'My Account',                 to: '/account' },
  { emoji: '🔍', label: 'Buy Vehicles',               to: '/search' },
  { emoji: '🚗', label: 'Buy Cars',                   to: '/search?vtype=Car' },
  { emoji: '🚙', label: 'Buy SUVs / Jeeps',           to: '/search?vtype=SUV' },
  { emoji: '🚐', label: 'Buy Vans',                   to: '/search?vtype=Van' },
  { emoji: '🏍', label: 'Buy Motorbikes',             to: '/search?vtype=motorcycles' },
  { emoji: '🛻', label: 'Buy Pickup',                 to: '/search?vtype=Pickup' },
  { emoji: '🚚', label: 'Buy Lorry',                  to: '/search?vtype=Lorry' },
  { emoji: '🚲', label: 'Buy Bicycles',               to: '/search?vtype=bicycles' },
  { emoji: '🔧', label: 'Spare Parts & Accessories',  to: '/search?type=spare-parts' },
  { emoji: '💳', label: 'Vehicle Leasing',            to: '/leasing-offers' },
  { emoji: '❤',  label: 'Contribute',                to: '/contribute' },
  { emoji: '📩', label: 'Contact Us',                 to: '/contact' },
];

/* ── Desktop-only NavLink ─────────────────────────────────────────── */
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        color: 'white', marginLeft: 18, textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center',
        transition: 'opacity 0.2s ease', fontSize: 13, fontWeight: 500,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    close();
  };

  return (
    <>
      {/* ══════════════════════════════════════════════
          MOBILE TOPBAR  (hidden on desktop ≥ 768px)
          ══════════════════════════════════════════════ */}
      <header className="mobile-topbar">
        {/* Hamburger */}
        <button
          className={`mob-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>

        {/* Logo — centered */}
        <div className="mob-topbar-logo">
          <Link to="/" onClick={close}><Logo /></Link>
        </div>

        {/* Post Free Ad CTA */}
        <Link
          to={isLoggedIn ? '/account' : '/register'}
          className="mob-topbar-cta"
        >
          Post Free Ad
        </Link>

        {/* Slide-in drawer */}
        <nav className={`mob-menu${menuOpen ? ' open' : ''}`}>
          <ul>
            {MENU_ITEMS.map(item => {
              if (item.guestOnly && isLoggedIn) return null;
              return (
                <li key={item.to + item.label}>
                  <Link to={item.to} onClick={close}>
                    <span className="mob-menu-icon">{item.emoji}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {isLoggedIn && (
              <li>
                <button className="mob-menu-logout-btn" onClick={handleLogout}>
                  <span className="mob-menu-icon">🚪</span>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Overlay backdrop */}
        {menuOpen && (
          <div className="mob-menu-overlay" onClick={close} />
        )}
      </header>

      {/* ══════════════════════════════════════════════
          DESKTOP NAVBAR  (hidden on mobile < 768px)
          ══════════════════════════════════════════════ */}
      <header
        id="header"
        className="desktop-navbar sticky top-0 z-50"
        style={{ backgroundColor: '#039be6', boxShadow: '0 2px 6px rgba(0,0,0,0.10)' }}
      >
        <div
          className="header-wrap"
          style={{
            maxWidth: 1200, margin: '0 auto', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px', flexWrap: 'wrap',
          }}
        >
          <div id="logo">
            <Link to="/"><Logo /></Link>
          </div>

          <nav style={{ flexGrow: 2, textAlign: 'right', fontSize: 13, fontWeight: 500 }}>
            <Link
              to={isLoggedIn ? '/account' : '/register'}
              style={{
                backgroundColor: '#ffa950', fontWeight: 600, padding: '8px 18px',
                borderRadius: 5, fontSize: 13, color: 'white', marginLeft: 18,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                gap: 5, transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e69236'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.20)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffa950'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
              Post Free Vehicle Ad
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => { logout(); navigate('/'); }}
                style={{ color: 'white', marginLeft: 18, fontSize: 13, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', transition: 'opacity 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
            <NavLink to="/account">My Account</NavLink>
            <NavLink to="/leasing-offers">Leasing Offers</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/contribute">Contribute</NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}
