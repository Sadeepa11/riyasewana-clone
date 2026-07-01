import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      id="header"
      style={{ backgroundColor: '#039be6', boxShadow: '0 2px 6px rgba(0,0,0,0.10)' }}
      className="sticky top-0 z-50"
    >
      <div
        className="header-wrap"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          flexWrap: 'wrap',
        }}
      >
        {/* Logo */}
        <div id="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Nav */}
        <nav
          style={{
            flexGrow: 2,
            textAlign: 'right',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {/* Post Free Vehicle Ad button */}
          <Link
            to={isLoggedIn ? '/account' : '/register'}
            style={{
              backgroundColor: '#ffa950',
              fontWeight: 600,
              padding: '8px 18px',
              borderRadius: 5,
              fontSize: 13,
              color: 'white',
              marginLeft: 18,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#e69236';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.20)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#ffa950';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            Post Free Vehicle Ad
          </Link>

          {/* Nav links */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                color: 'white', marginLeft: 18, fontSize: 13, fontWeight: 500,
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center',
                transition: 'opacity 0.2s ease',
              }}
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
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        color: 'white',
        marginLeft: 18,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'opacity 0.2s ease',
        fontSize: 13,
        fontWeight: 500,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
    >
      {children}
    </Link>
  );
}
