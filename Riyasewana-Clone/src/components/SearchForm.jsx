import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MOST_POPULAR_MAKES, ALL_MAKES } from '../data/makes';
import { CITY_DISTRICTS } from '../data/cities';

const VTYPES = [
  { value: 'cars', label: 'Car' },
  { value: 'vans', label: 'Van' },
  { value: 'suvs', label: 'SUV / Jeep' },
  { value: 'motorcycles', label: 'Motorcycle' },
  { value: 'crew-cabs', label: 'Crew Cab' },
  { value: 'pickups', label: 'Pickup / Double Cab' },
  { value: 'buses', label: 'Bus' },
  { value: 'lorries', label: 'Lorry' },
  { value: 'three-wheels', label: 'Three Wheel' },
  { value: 'others', label: 'Other' },
  { value: 'tractors', label: 'Tractor' },
  { value: 'heavy-duties', label: 'Heavy-Duty' },
  { value: 'bicycles', label: 'Bicycle' },
];

const VCATS = [
  { value: 'antique', label: 'Antique' },
  { value: 'brand-new', label: 'Brand New' },
  { value: 'registered', label: 'Registered' },
  { value: 'unregistered', label: 'Unregistered' },
];

const FUELS = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'gas', label: 'Gas' },
  { value: 'kick', label: 'Kick' },
];

const YEARS = Array.from({ length: 47 }, (_, i) => String(2026 - i));

const TYPE_TO_VTYPE = {
  motorbikes: 'motorcycles',
  'heavy-duty': 'heavy-duties',
};

export default function SearchForm({ heading = 'Vehicles for Sale in Sri Lanka' }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const rawType = params.get('type');
  const lockedVtype = rawType ? (TYPE_TO_VTYPE[rawType] || rawType) : null;
  const lockedVtypeEntry = lockedVtype ? VTYPES.find(t => t.value === lockedVtype) : null;
  const isMoto = lockedVtype === 'motorcycles';

  const [form, setForm] = useState({
    make:      params.get('make')      || 'Any',
    model:     params.get('model')     || '',
    vtype:     lockedVtype || params.get('vtype') || 'Any',
    vcat:      params.get('vcat')      || 'Any',
    city:      params.get('city')      || 'Any',
    fuel:      params.get('fuel')      || 'Any',
    trans:     params.get('trans')     || 'Any',
    year:      params.get('year')      || '',
    year_max:  params.get('year_max')  || '',
    pricemmin: params.get('pricemmin') || '',
    pricemmax: params.get('pricemmax') || '',
  });

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSearch = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => {
      if (isMoto && k === 'trans') return;
      if (v && v !== 'Any') params.set(k, v);
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="srch-box">
      <h1>{heading}</h1>
      <form onSubmit={handleSearch}>

        {/* Make */}
        <div className="sflt">
          <select name="make" className="htext" value={form.make} onChange={set('make')}>
            <option value="Any"> Any Make </option>
            <optgroup label="Most Popular Makes">
              {MOST_POPULAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </optgroup>
            <optgroup label="All Makes">
              {ALL_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </optgroup>
          </select>
        </div>

        {/* Model */}
        <div className="sflt">
          <input type="text" name="model" className="htext" placeholder="Model (e.g. Corolla, Civic)" value={form.model} onChange={set('model')} />
        </div>

        {/* Type */}
        <div className="sflt">
          <select name="vtype" className="htext" value={form.vtype} onChange={set('vtype')}>
            {lockedVtypeEntry ? (
              <option value={lockedVtypeEntry.value}>{lockedVtypeEntry.label}</option>
            ) : (
              <>
                <option value="Any"> Any Type </option>
                {VTYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </>
            )}
          </select>
        </div>

        {/* Condition */}
        <div className="sflt">
          <select name="vcat" className="htext" value={form.vcat} onChange={set('vcat')}>
            <option value="Any"> Any Condition </option>
            {VCATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        {/* City */}
        <div className="sflt">
          <select name="city" className="htext" value={form.city} onChange={set('city')}>
            <option value="Any"> Any City </option>
            {CITY_DISTRICTS.map(({ label, cities }) => (
              <optgroup key={label} label={label}>
                {cities.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div className="sflt">
          <select name="fuel" className="htext" value={form.fuel} onChange={set('fuel')}>
            <option value="Any"> Any Fuel </option>
            {FUELS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>

        {/* Transmission */}
        {!isMoto && (
          <div className="sflt">
            <select name="trans" className="htext" value={form.trans} onChange={set('trans')}>
              <option value="Any"> Any Gear </option>
              <option value="Automatic">Auto</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        )}

        {/* Year Min */}
        <div className="sflt">
          <select name="year" className="htext" value={form.year} onChange={set('year')}>
            <option value=""> Year Min </option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            <option value="old"> &lt; 1979 </option>
          </select>
        </div>

        {/* Year Max */}
        <div className="sflt">
          <select name="year_max" className="htext" value={form.year_max} onChange={set('year_max')}>
            <option value=""> Year Max </option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            <option value="old"> &lt; 1979 </option>
          </select>
        </div>

        {/* Min Price */}
        <div className="sflt">
          <input type="number" name="pricemmin" className="htext" placeholder="Min Price" min="0" value={form.pricemmin} onChange={set('pricemmin')} />
        </div>

        {/* Max Price */}
        <div className="sflt">
          <input type="number" name="pricemmax" className="htext" placeholder="Max Price" min="0" value={form.pricemmax} onChange={set('pricemmax')} />
        </div>

        {/* Search Button */}
        <div className="sflt">
          <button type="submit" className="htextbtn">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </button>
        </div>

      </form>
    </div>
  );
}
