import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';

function GBtn({ cat }) {
  return (
    <Link to={cat.path} className="gbtn2">
      <img src={cat.icon} alt={cat.sub} />
      <span>{cat.label}<br />{cat.sub}</span>
    </Link>
  );
}

export default function CategoryBar() {
  return (
    <div
      id="midbtmctn2"
      style={{
        display: 'flex',
        overflowX: 'auto',
        rowGap: 12,
        columnGap: 12,
        padding: 20,
        maxWidth: 1200,
        margin: '5px auto',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {CATEGORIES.map(cat => (
        <GBtn key={cat.id} cat={cat} />
      ))}
    </div>
  );
}
