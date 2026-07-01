import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PARTS_CATEGORIES = [
  'Air Conditioning & Heating', 'Air Intake & Fuel Delivery', 'Axles & Axle Parts',
  'Battery', 'Brakes', 'Car Audio Systems', 'Car DVR', 'Car Tuning & Styling',
  'Carburetor', 'Chassis', 'Electrical Components', 'Emission Systems',
  'Engine Cooling', 'Engines & Engine Parts', 'Exhausts & Exhaust Parts',
  'External & Body Parts', 'External Lights & Indicators', 'Footrests, Pedals & Pegs',
  'Freezer', 'Gauges, Dials & Instruments', 'Generator', 'GPS & In-Car Technology',
  'Handlebars, Grips & Levers', 'Helmets, Clothing & Protection',
  'Interior Parts & Furnishings', 'Lighting & Indicators', 'Mirrors',
  'Oils, Lubricants & Fluids', 'Other', 'Reverse Camera', 'Seating', 'Service Kits',
  'Silencer', 'Solar Panels', 'Starter Motors', 'Stickers',
  'Suspension, Steering & Handling', 'Transmission & Drivetrain',
  'Turbos & Superchargers', 'Water Pumps', 'Wheels, Tyres & Rims',
  'Windscreen Wipers & Washers',
];

export default function PartsSearch() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ vc: '', model: '' });

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const params = new URLSearchParams({ type: 'spare-parts' });
    if (form.vc) params.set('vc', form.vc);
    if (form.model) params.set('model', form.model);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="parts-search">
      <h1>Search vehicle spare parts in Sri Lanka</h1>
      <form className="parts-search-form" onSubmit={handleSubmit}>
        <select name="vc" value={form.vc} onChange={set('vc')}>
          <option value=""> Any Part or Accessory</option>
          {PARTS_CATEGORIES.map(c => (
            <option key={c} value={c.toLowerCase()}>{c}</option>
          ))}
        </select>
        <input
          type="text"
          name="model"
          placeholder="Part / Accessory Name"
          value={form.model}
          onChange={set('model')}
        />
        <input type="submit" className="search-btn" value="Search" />
      </form>
    </div>
  );
}
