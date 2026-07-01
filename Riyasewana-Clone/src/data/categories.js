const IMG = 'https://riyasewana.com/images/menu-icons/';

export const CATEGORIES = [
  { id: 'cars',         label: 'Buy', sub: 'Cars',         path: '/search?type=cars',         icon: `${IMG}car.png` },
  { id: 'suvs',         label: 'Buy', sub: 'SUVs',         path: '/search?type=suvs',         icon: `${IMG}suv.png` },
  { id: 'vans',         label: 'Buy', sub: 'Vans',         path: '/search?type=vans',         icon: `${IMG}van.png` },
  { id: 'motorbikes',   label: 'Buy', sub: 'Motorbikes',   path: '/search?type=motorbikes',   icon: `${IMG}motorbike.png` },
  { id: 'lorries',      label: 'Buy', sub: 'Lorries',      path: '/search?type=lorries',      icon: `${IMG}lorry.png` },
  { id: 'three-wheels', label: 'Buy', sub: 'Three Wheels', path: '/search?type=three-wheels', icon: `${IMG}tuktuk.png` },
  { id: 'pickups',      label: 'Buy', sub: 'Pickups',      path: '/search?type=pickups',      icon: `${IMG}pickup.png` },
  { id: 'heavy-duty',   label: 'Buy', sub: 'Heavy-Duty',   path: '/search?type=heavy-duty',   icon: `${IMG}heavy-duty.png` },
  { id: 'spare-parts',  label: 'Buy', sub: 'Spare Parts',  path: '/search?type=spare-parts',  icon: `${IMG}spareparts.png` },
];

export const TYPE_ICON = Object.fromEntries(CATEGORIES.map(c => [c.id, c.icon]));
