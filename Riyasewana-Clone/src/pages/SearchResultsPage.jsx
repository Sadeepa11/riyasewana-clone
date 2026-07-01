import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VehicleCard from '../components/VehicleCard';
import SearchForm from '../components/SearchForm';
import PartsSearch from '../components/PartsSearch';
import Pagination from '../components/Pagination';
import { VEHICLES } from '../data/vehicles';

const SORT_OPTIONS = [
  { value: 'newest',        label: 'Newest First' },
  { value: 'price-asc',    label: 'Price: Low to High' },
  { value: 'price-desc',   label: 'Price: High to Low' },
  { value: 'year-desc',    label: 'Year: Newest' },
  { value: 'year-asc',     label: 'Year: Oldest' },
  { value: 'mileage-asc',  label: 'Mileage: Low to High' },
  { value: 'mileage-desc', label: 'Mileage: High to Low' },
];

const PER_PAGE = 10;

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const typeParam = params.get('type') || '';
  const qParam = params.get('q') || '';
  const cityParam = params.get('city') || '';
  const makeParam = params.get('make') || '';

  useEffect(() => {
    setPage(1);
  }, [typeParam, qParam, cityParam, makeParam]);

  const TYPE_HEADINGS = {
    cars: 'Cars for Sale in Sri Lanka',
    vans: 'Vans for Sale in Sri Lanka',
    suvs: 'SUVs for Sale in Sri Lanka',
    motorbikes: 'Motorbikes for Sale in Sri Lanka',
    lorries: 'Lorries for Sale in Sri Lanka',
    'three-wheels': 'Three Wheelers for Sale in Sri Lanka',
    pickups: 'Pickups for Sale in Sri Lanka',
    'heavy-duty': 'Heavy-Duty Vehicles for Sale in Sri Lanka',
    'spare-parts': 'Spare Parts for Sale in Sri Lanka',
  };
  const searchHeading = TYPE_HEADINGS[typeParam] || 'Vehicles for Sale in Sri Lanka';

  const filtered = useMemo(() => {
    let results = VEHICLES.filter(v => {
      if (typeParam && v.type !== typeParam) return false;
      if (makeParam && v.make?.toLowerCase() !== makeParam.toLowerCase()) return false;
      if (qParam && !`${v.title} ${v.make} ${v.model}`.toLowerCase().includes(qParam.toLowerCase())) return false;
      if (cityParam && v.city?.toLowerCase() !== cityParam.toLowerCase()) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':    results.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'price-desc':   results.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case 'year-desc':    results.sort((a, b) => (b.year || 0) - (a.year || 0)); break;
      case 'year-asc':     results.sort((a, b) => (a.year || 0) - (b.year || 0)); break;
      case 'mileage-asc':  results.sort((a, b) => (a.mileage || 0) - (b.mileage || 0)); break;
      case 'mileage-desc': results.sort((a, b) => (b.mileage || 0) - (a.mileage || 0)); break;
      default: results.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return results;
  }, [typeParam, makeParam, qParam, cityParam, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const displayFrom = filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const displayTo = Math.min(page * PER_PAGE, filtered.length);

  const heading = typeParam
    ? typeParam.charAt(0).toUpperCase() + typeParam.slice(1).replace(/-/g, ' ')
    : qParam || cityParam || 'All Vehicles';

  return (
    <div className="py-4">
      <div className="page-container">
        {/* Search Box */}
        {typeParam === 'spare-parts' ? (
          <PartsSearch />
        ) : (
          <SearchForm heading={searchHeading} />
        )}
   

        {/* Breadcrumb */}
        <div className="text-[12px] text-gray-400 mb-3">
          <Link to="/" className="hover:text-[#00b4d8] text-[#0284c7]">Home</Link>
          <span className="mx-1.5">/</span>
          <Link to="/search" className="hover:text-[#00b4d8] text-[#0284c7]">All Ads</Link>
          {heading && heading !== 'All Vehicles' && (
            <>
              <span className="mx-1.5">/</span>
              <span className="font-bold text-gray-600">{heading}</span>
            </>
          )}
        </div>

        {/* Header bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 py-2">
          <h2 className="text-[13px] font-semibold text-gray-800">
            {filtered.length === 0
              ? 'No results found'
              : `Displaying ${displayFrom} - ${displayTo} of ${filtered.length} Search Results`}
          </h2>
          <div className="flex items-center gap-1">
            <label htmlFor="sort_sel" className="text-[12px] font-semibold">Sort:</label>
            <select
              id="sort_sel"
              className="form-select py-1.5 text-[12px] w-auto"
              value={sort}
              onChange={e => { setSort(e.target.value); setPage(1); }}
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Top pagination */}
        <Pagination current={page} total={totalPages} onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

        {/* Cards */}
        {paged.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-gray-500 text-[14px]">No vehicles found matching your search.</p>
            <Link to="/" className="text-[#00b4d8] text-[13px] hover:underline mt-2 block">
              Clear search and browse all
            </Link>
          </div>
        ) : (
          <motion.ul
            key={`${typeParam}-${sort}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="v-list"
          >
            {paged.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </motion.ul>
        )}

      </div>
    </div>
  );
}
