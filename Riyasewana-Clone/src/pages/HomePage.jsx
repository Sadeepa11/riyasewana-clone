import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOST_POPULAR_MAKES, ALL_MAKES } from '../data/makes';
import { CITY_DISTRICTS } from '../data/cities';
import { POPULAR_BRANDS } from '../data/vehicles';
import PartsSearch from '../components/PartsSearch';

const SEO_POPULAR = [
  'Toyota','Nissan','Honda','Suzuki','Mitsubishi','Mazda','Hyundai','Bajaj',
  'Isuzu','Peugeot','Daihatsu','Daewoo','Tata','Yamaha','Tvs','Hero-Honda',
  'Mahindra','Micro','Volkswagen','Ford',
];
const SEO_FUELS_LINKS = ['Diesel','Petrol','Hybrid','Gas','Electric'];
const SEO_CITIES = [
  'Colombo','Gampaha','Kandy','Kurunegala','Kalutara','Galle','Kegalle','Negombo',
  'Matara','Ratnapura','Anuradapura','Kuliyapitiya','Panadura','Chilaw','Puttalam',
  'Matale','Horana','Ja-Ela','Kelaniya','Maharagama','Badulla','Ambalangoda',
  'Homagama','Nuwara-Eliya','Hambantota','Gampola','Minuwangoda','Moratuwa','Wattala',
];
const SEO_TYPES = [
  { label:'All Type', to:'/search' },
  { label:'Car', to:'/search?vtype=Car' },
  { label:'Van', to:'/search?vtype=Van' },
  { label:'SUV', to:'/search?vtype=SUV' },
  { label:'Crew Cab', to:'/search?vtype=Crew+Cab' },
  { label:'Pickup', to:'/search?vtype=Pickup' },
  { label:'Bus', to:'/search?vtype=Bus' },
  { label:'Lorry', to:'/search?vtype=Lorry' },
  { label:'Three Wheel', to:'/search?vtype=Three+Wheel' },
  { label:'Tractor', to:'/search?vtype=Tractor' },
  { label:'Heavy-Duty', to:'/search?vtype=Heavy-Duty' },
  { label:'Other', to:'/search?vtype=Other' },
  { label:'Bicycles', to:'/search?vtype=bicycles' },
];
const SEO_CONDITIONS = [
  { label:'Registered', to:'/search?vcat=registered' },
  { label:'Brand New', to:'/search?vcat=brand-new' },
  { label:'Antique', to:'/search?vcat=antique' },
  { label:'Unregistered (Recondition)', to:'/search?vcat=unregistered' },
];

const YEARS = Array.from({ length: 47 }, (_, i) => String(2026 - i));

const VTYPES = [
  { value: 'Car', label: 'Car' },
  { value: 'Van', label: 'Van' },
  { value: 'SUV', label: 'SUV / Jeep' },
  { value: 'Crew Cab', label: 'Crew Cab' },
  { value: 'Pickup', label: 'Pickup / Double Cab' },
  { value: 'Bus', label: 'Bus' },
  { value: 'Lorry', label: 'Lorry / Tipper' },
  { value: 'Three Wheel', label: 'Three Wheel' },
  { value: 'Tractor', label: 'Tractor' },
  { value: 'Heavy-Duty', label: 'Heavy-Duty' },
  { value: 'Other', label: 'Other' },
  { value: 'motorcycles', label: 'Motorcycle' },
  { value: 'bicycles', label: 'Bicycles' },
];

const CONDITIONS = [
  { value: 'Any', label: 'Any' },
  { value: 'Antique', label: 'Antique' },
  { value: 'Brand New', label: 'Brand New' },
  { value: 'Registered (Used)', label: 'Registered (Used)' },
  { value: 'Unregistered (Recondition)', label: 'Unregistered (Recondition)' },
];

const FUELS = [
  { value: 'Any', label: 'Any Fuel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'gas', label: 'Gas' },
];

const YT_PLAY_BTN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 68 48'><path d='M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z' fill='red'/><path d='M45 24 27 14v20' fill='white'/></svg>\")";

function LiteYouTube({ videoid }) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi_webp/${videoid}/sddefault.webp`;
  const embed = `https://www.youtube-nocookie.com/embed/${videoid}?autoplay=1&playsinline=1`;

  return (
    <div
      style={{ backgroundColor: '#000', position: 'relative', display: 'block', backgroundImage: `url("${thumb}")`, backgroundPosition: 'center', backgroundSize: 'cover', cursor: 'pointer', maxWidth: 720 }}
      onClick={() => !active && setActive(true)}
    >
      <div style={{ paddingBottom: '56.25%' }} />
      {active ? (
        <iframe
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          src={embed}
          title="Play"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', backgroundImage: YT_PLAY_BTN, backgroundPosition: 'center', backgroundSize: '68px 48px', backgroundRepeat: 'no-repeat', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', filter: 'grayscale(100%)', transition: 'filter 0.1s cubic-bezier(0,0,.2,1)' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'none'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(100%)'; }}
        />
      )}
    </div>
  );
}

function SeoLink({ to, children }) {
  return <Link to={to} className="seo-link">{children}</Link>;
}

function SeoH2({ children, style }) {
  return (
    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', padding: '12px 0 8px', margin: '0 0 8px', borderBottom: '1px solid #d8dce2', ...style }}>
      {children}
    </h2>
  );
}

function BrandLinks({ children }) {
  return <div className="brand-links">{children}</div>;
}

const MOB_CATEGORIES = [
  { emoji: '🚘', label: 'All Vehicles',  to: '/search' },
  { emoji: '🚗', label: 'Cars',          to: '/search?vtype=Car' },
  { emoji: '🏍', label: 'Motorbikes',    to: '/search?vtype=motorcycles' },
  { emoji: '🚐', label: 'Vans',          to: '/search?vtype=Van' },
  { emoji: '🚙', label: 'SUVs / Jeeps',  to: '/search?vtype=SUV' },
  { emoji: '🛻', label: 'Pickups',       to: '/search?vtype=Pickup' },
  { emoji: '🛺', label: 'Three Wheels',  to: '/search?vtype=Three+Wheel' },
  { emoji: '🚛', label: 'Lorries',       to: '/search?vtype=Lorry' },
  { emoji: '🚜', label: 'Heavy Duty',    to: '/search?vtype=Heavy-Duty' },
  { emoji: '🚚', label: 'Crew Cabs',     to: '/search?vtype=Crew+Cab' },
  { emoji: '🚌', label: 'Buses',         to: '/search?vtype=Bus' },
  { emoji: '🚜', label: 'Tractors',      to: '/search?vtype=Tractor' },
  { emoji: '🔧', label: 'Spare Parts',   to: '/search?type=spare-parts' },
  { emoji: '🚲', label: 'Bicycles',      to: '/search?vtype=bicycles' },
];

const CHIPS = [
  { label: 'Cars',         to: '/search?vtype=Car' },
  { label: 'Motorbikes',   to: '/search?vtype=motorcycles' },
  { label: 'Vans',         to: '/search?vtype=Van' },
  { label: 'SUVs',         to: '/search?vtype=SUV' },
  { label: 'Pickups',      to: '/search?vtype=Pickup' },
  { label: 'Lorries',      to: '/search?vtype=Lorry' },
  { label: 'Three Wheels', to: '/search?vtype=Three+Wheel' },
  { label: 'Parts',        to: '/search?type=spare-parts' },
  { label: 'Bicycles',     to: '/search?vtype=bicycles' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeChip, setActiveChip] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [form, setForm] = useState({
    make: '', model: '', vtype: '', vcat: '',
    city: 'Any', fuel: 'Any', trans: 'Any',
    year: '', year_max: '', pricemmin: '', pricemmax: '',
  });
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSearch = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => { if (v && v !== 'Any') params.set(k, v); });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <>
      {/* ── Mobile hero: title + chips (hidden on desktop) ── */}
      <div className="mob-hero">
        <h1 className="mob-hero-title">Find Your Next Vehicle</h1>
        <div className="mob-chips">
          {CHIPS.map(c => (
            <Link
              key={c.label}
              to={c.to}
              className={`mob-chip${activeChip === c.label ? ' active' : ''}`}
              onClick={() => setActiveChip(c.label)}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mobile search form (hidden on desktop) ── */}
      <div className="mob-search-wrap">
        <form className="mob-search-form" onSubmit={handleSearch}>

          {/* Row 1: Type + Make */}
          <div className="mob-form-row2">
            <select className="mob-field mob-select" value={form.vtype} onChange={set('vtype')}>
              <option value="">Any Type</option>
              {VTYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <select className="mob-field mob-select" value={form.make} onChange={set('make')}>
              <option value="">Any Make</option>
              <optgroup label="Most Popular Makes">
                {MOST_POPULAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </optgroup>
              <optgroup label="All Makes">
                {ALL_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </optgroup>
            </select>
          </div>

          {/* Row 2: Model */}
          <input
            type="text"
            placeholder="Model (e.g. Corolla, Civic)"
            className="mob-field"
            value={form.model}
            onChange={set('model')}
          />

          {/* More / Less Filters toggle */}
          <button
            type="button"
            className="mob-filters-toggle"
            onClick={() => setShowMore(o => !o)}
          >
            {showMore ? 'Less Filters' : 'More Filters'}
            <svg
              width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: showMore ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showMore && (
            <div className="mob-extra-filters">
              <div className="mob-form-row2">
                <select className="mob-field mob-select" value={form.vcat} onChange={set('vcat')}>
                  <option value="">Condition</option>
                  {CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <select className="mob-field mob-select" value={form.city} onChange={set('city')}>
                  <option value="Any">Any City</option>
                  {CITY_DISTRICTS.map(({ label, cities }) => (
                    <optgroup key={label} label={label}>
                      {cities.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="mob-form-row2">
                <select className="mob-field mob-select" value={form.fuel} onChange={set('fuel')}>
                  {FUELS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
                <select className="mob-field mob-select" value={form.trans} onChange={set('trans')}>
                  <option value="Any">Any Gear</option>
                  <option value="Automatic">Auto</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="mob-form-row2">
                <select className="mob-field mob-select" value={form.year} onChange={set('year')}>
                  <option value="">Year Min</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  <option value="old">&lt; 1979</option>
                </select>
                <select className="mob-field mob-select" value={form.year_max} onChange={set('year_max')}>
                  <option value="">Year Max</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  <option value="old">&lt; 1979</option>
                </select>
              </div>
              <div className="mob-form-row2">
                <input type="number" placeholder="Min Price" min="0" className="mob-field" value={form.pricemmin} onChange={set('pricemmin')} />
                <input type="number" placeholder="Max Price" min="0" className="mob-field" value={form.pricemmax} onChange={set('pricemmax')} />
              </div>
            </div>
          )}

          {/* Search button */}
          <button type="submit" className="mob-search-btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search Vehicles
          </button>

        </form>
      </div>

      {/* ── Mobile category list (hidden on desktop) ── */}
      <div className="mob-cat-section">
        <h2 className="mob-section-heading">Browse Categories</h2>
        <div className="mob-cat-grid">
          {MOB_CATEGORIES.map(cat => (
            <Link key={cat.label} to={cat.to} className="mob-cat-item">
              <span className="mob-cat-icon">{cat.emoji}</span>
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mobile video card (hidden on desktop) ── */}
      <div className="mob-video-section">
        <div className="mob-card">
          <h2 className="mob-card-title">Latest Vehicle Review</h2>
          <LiteYouTube videoid="CMAL_SS0XGk" />
          <a
            href="https://www.youtube.com/c/RiyasewanaCom"
            target="_blank"
            rel="noopener noreferrer"
            className="mob-yt-link"
          >
            More Reviews on YouTube &#9654;
          </a>
        </div>
      </div>

      {/* ── Mobile Buy & Sell story card (hidden on desktop) ── */}
      <div className="mob-story-section">
        <div className="mob-card">
          <h2 className="mob-card-title">Buy &amp; Sell Vehicles in Sri Lanka</h2>
          <div className="mob-story-body">
            <div className="mob-story-pad">
              Riyasewana is Sri Lanka&apos;s largest vehicle marketplace, with thousands of listings for{' '}
              <Link to="/search?vtype=Car">cars</Link>,{' '}
              <Link to="/search?vtype=Van">vans</Link>,{' '}
              <Link to="/search?vtype=SUV">SUVs</Link> and{' '}
              <Link to="/search?vtype=motorcycles">motorbikes</Link>{' '}
              updated daily by dealers and private sellers across the island.
            </div>
            <div className="mob-story-pad">
              Looking for{' '}
              <Link to="/search?vtype=Lorry">commercial vehicles</Link>?
              {' '}Browse Lorries, Crew Cabs, Pickups, Buses, and Heavy-Duty vehicles all in one place — filter by make, model, year, and price to find exactly what you need.
            </div>
            <div className="mob-story-pad">
              Take advantage of competitive{' '}
              <Link to="/leasing-offers">vehicle leasing offers</Link>{' '}
              from leading finance companies in Sri Lanka. Compare rates and find the best deal before you buy.
            </div>
            <div className="mob-story-pad">
              Have a vehicle to sell?{' '}
              <Link to="/register">Post your free ad</Link>{' '}
              today and reach thousands of buyers instantly — no charges, no commissions.
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop content (hidden on mobile) ── */}
      <div className="desktop-only">
      {/* Search Card */}
      <div className="wrap" style={{ paddingTop: 24 }}>
        <div className="card search-card">
          <h1 style={{ fontWeight: 700, color: '#1a1a2e', textAlign: 'center', fontSize: 20, padding: '24px 20px 8px', margin: 0 }}>
            Find The Best Vehicle For You
          </h1>
          <div style={{ padding: '8px 24px 24px' }}>
            <form onSubmit={handleSearch}>
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: 10, columnGap: 10 }}>

                {/* Make */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.make} onChange={set('make')}>
                    <option value="">Any Make</option>
                    <optgroup label="Most Popular Makes">
                      {MOST_POPULAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                    </optgroup>
                    <optgroup label="All Makes">
                      {ALL_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                    </optgroup>
                  </select>
                </div>

                {/* Model */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <input type="text" name="model" placeholder="Model (e.g. Corolla, Civic)" className="s-field" value={form.model} onChange={set('model')} />
                </div>

                {/* Type */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.vtype} onChange={set('vtype')}>
                    <option value="">Any Type</option>
                    <option value="Any">Any</option>
                    {VTYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                {/* Condition */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.vcat} onChange={set('vcat')}>
                    <option value="">Any Condition</option>
                    {CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                {/* City */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.city} onChange={set('city')}>
                    <option value="Any">Any City</option>
                    {CITY_DISTRICTS.map(({ label, cities }) => (
                      <optgroup key={label} label={label}>
                        {cities.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Fuel */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.fuel} onChange={set('fuel')}>
                    {FUELS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                </div>

                {/* Transmission */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.trans} onChange={set('trans')}>
                    <option value="Any">Any Gear</option>
                    <option value="Automatic">Auto</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                {/* Year Min */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.year} onChange={set('year')}>
                    <option value="">Year Min</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    <option value="old">&lt; 1979</option>
                  </select>
                </div>

                {/* Year Max */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <select className="s-field s-select" value={form.year_max} onChange={set('year_max')}>
                    <option value="">Year Max</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    <option value="old">&lt; 1979</option>
                  </select>
                </div>

                {/* Min Price */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <input type="number" name="pricemmin" placeholder="Min Price" min="0" className="s-field" value={form.pricemmin} onChange={set('pricemmin')} />
                </div>

                {/* Max Price */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <input type="number" name="pricemmax" placeholder="Max Price" min="0" className="s-field" value={form.pricemmax} onChange={set('pricemmax')} />
                </div>

                {/* Search Button */}
                <div style={{ flex: '1 1 calc(33.33% - 7px)', minWidth: 180 }}>
                  <button
                    type="submit"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: 48, background: '#00a050', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", transition: 'background 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#008a44'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#00a050'; }}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Search Vehicles
                  </button>
                </div>

              </div>
            </form>
          </div>

       

        </div>
      </div>

      {/* About / Story Card */}
      <div className="wrap" style={{ paddingTop: 20 }}>
        <div className="card">
          <div className="story-body" style={{ textAlign: 'center' }}>
            <div className="pad">
              Riyasewana is Sri Lanka&apos;s largest vehicle marketplace, connecting buyers and sellers since 2009. Browse the largest collection of Cars, SUVs, Vans, Motorbikes, Lorries and Three Wheelers for sale across the island.
            </div>
            <div className="pad">
              Compare prices, find the best deals on new and used vehicles, and take advantage of{' '}
              <Link to="/leasing-offers">leasing offers</Link>{' '}
              from leading finance institutes.
            </div>
            <div className="pad">
              Post your{' '}
              <Link to="/register">free ad</Link>{' '}
              today and reach thousands of buyers instantly!
            </div>
          </div>
        </div>
      </div>

      {/* Video Card */}
      <div className="wrap" style={{ paddingTop: 20 }}>
        <div className="card video-card">
          <h2 style={{ padding: '16px 20px 12px', fontSize: 16, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            Latest Riyasewana Vehicle Review
          </h2>
          <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px 16px' }}>
            <LiteYouTube videoid="CMAL_SS0XGk" />
          </div>
          <a
            href="https://www.youtube.com/c/RiyasewanaCom"
            target="_blank"
            rel="noopener noreferrer"
          >
            More Reviews on YouTube &#9654;
          </a>
        </div>
      </div>

      {/* SEO Links — 3 columns */}
      <div className="wrap" style={{ paddingTop: 20 }}>
        <div className="seo-links">

          {/* Col 1: Popular Search + Search by Fuel */}
          <div className="seo-col card" style={{ padding: '0 20px' }}>
            <SeoH2>Popular Search</SeoH2>
            <BrandLinks>
              {SEO_POPULAR.map(m => <SeoLink key={m} to={`/search?make=${encodeURIComponent(m)}`}>{m}</SeoLink>)}
              <SeoLink to="/search">All</SeoLink>
            </BrandLinks>
            <SeoH2 style={{ marginTop: 12 }}>Search by Fuel</SeoH2>
            <BrandLinks>
              {SEO_FUELS_LINKS.map(f => <SeoLink key={f} to={`/search?fuel=${f.toLowerCase()}`}>{f}</SeoLink>)}
            </BrandLinks>
          </div>

          {/* Col 2: Search by City */}
          <div className="seo-col card" style={{ padding: '0 20px' }}>
            <SeoH2>Search by City</SeoH2>
            <BrandLinks>
              <SeoLink to="/search">City by type</SeoLink>
              {SEO_CITIES.map(c => <SeoLink key={c} to={`/search?city=${encodeURIComponent(c.toLowerCase())}`}>{c}</SeoLink>)}
            </BrandLinks>
          </div>

          {/* Col 3: Browse By Type & Make + Browse By Condition */}
          <div className="seo-col card" style={{ padding: '0 20px' }}>
            <SeoH2>Browse By Type &amp; Make</SeoH2>
            <BrandLinks>
              {SEO_TYPES.map(t => <SeoLink key={t.label} to={t.to}>{t.label}</SeoLink>)}
            </BrandLinks>
            <SeoH2 style={{ marginTop: 12 }}>Browse By Condition</SeoH2>
            <BrandLinks>
              {SEO_CONDITIONS.map(c => <SeoLink key={c.label} to={c.to}>{c.label}</SeoLink>)}
            </BrandLinks>
          </div>

        </div>
      </div>

      {/* Popular Brands & Types */}
      <div className="wrap" style={{ padding: '20px 20px 32px' }}>
        <div className="card" style={{ padding: '16px 20px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            Popular Brands &amp; Types
          </h2>
          <div className="brand-links" style={{ paddingTop: 8 }}>
            {POPULAR_BRANDS.map(({ label, to }) => (
              <Link key={label} to={to} className="brand-link">{label}</Link>
            ))}
          </div>
        </div>
      </div>
      </div>{/* end .desktop-only */}
    </>
  );
}
