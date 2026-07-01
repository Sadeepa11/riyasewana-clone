import { Link } from 'react-router-dom';

function SocialIcon({ label, children, href = '#' }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center text-white hover:text-[#00b4d8] transition-colors"
    >
      {children}
    </a>
  );
}

function AppBadge({ store, href = '#' }) {
  if (store === 'google') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-black text-white text-[10px] px-2.5 py-1.5 rounded-lg border border-white/20 hover:bg-gray-900 transition-colors">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M3.18 23.76A2 2 0 012 22V2A2 2 0 013.18.24L13.9 12 3.18 23.76zM16.54 9l-2.3-2.3-9.93-5.7 8.93 8.93 3.3-2.9zM21.5 10.66L18.7 9 15.4 11.9l3.3 3.1 3.2-1.66a1.5 1.5 0 000-2.68zM4.31 22.96l9.93-5.7 2.3-2.3-3.3-3.32-8.93 11.32z"/>
        </svg>
        <div>
          <div className="text-[8px] text-gray-400 leading-none">GET IT ON</div>
          <div className="text-[11px] font-semibold leading-tight">Google Play</div>
        </div>
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1.5 bg-black text-white text-[10px] px-2.5 py-1.5 rounded-lg border border-white/20 hover:bg-gray-900 transition-colors">
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div>
        <div className="text-[8px] text-gray-400 leading-none">Download on the</div>
        <div className="text-[11px] font-semibold leading-tight">App Store</div>
      </div>
    </a>
  );
}

export default function Footer() {
  const exploreLinks = [
    { label: 'Home', to: '/' },
    { label: 'Browse Vehicles', to: '/search' },
    { label: 'Spare Parts', to: '/search?type=spare-parts' },
    { label: 'Leasing Offers', to: '/leasing-offers' },
    { label: 'Vehicle Reviews', to: '/' },
  ];

  const accountLinks = [
    { label: 'Post Free Ad', to: '/account' },
    { label: 'My Account', to: '/account' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Contribute', to: '/contribute' },
  ];

  return (
    <footer className="bg-[#1c2237] text-gray-400 text-[13px]">
      <div className="page-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-3">About Us</h4>
            <p className="text-[13px] leading-relaxed mb-4">
              Sri Lanka&apos;s largest vehicle marketplace since 2026. Buy and sell Cars,
              SUVs, Vans, Motorbikes, Lorries and more.
            </p>
            <div className="flex gap-2">
              <AppBadge store="google" />
              <AppBadge store="apple" />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-3">Explore</h4>
            <ul className="space-y-2">
              {exploreLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-3">My Account</h4>
            <ul className="space-y-2">
              {accountLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-3">Legal &amp; Social</h4>
            <ul className="space-y-2 mb-4">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
            <div className="flex gap-1 flex-wrap">
              {/* YouTube */}
              <SocialIcon label="YouTube">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
              </SocialIcon>
              {/* TikTok */}
              <SocialIcon label="TikTok">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.54V6.76a4.85 4.85 0 01-1.07-.07z"/>
                </svg>
              </SocialIcon>
              {/* Facebook */}
              <SocialIcon label="Facebook">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
                </svg>
              </SocialIcon>
              {/* Instagram */}
              <SocialIcon label="Instagram">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIcon>
              {/* LinkedIn */}
              <SocialIcon label="LinkedIn">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialIcon>
              {/* Twitter/X */}
              <SocialIcon label="Twitter">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2e3550]">
        <div className="page-container py-3 text-center text-[12px]">
          <p>Made with ♥ in Sri Lanka 🇱🇰</p>
          <p className="mt-0.5">Copyright &copy; 2009-2026 Riyasewana Lanka (Pvt) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
