import { Link, useLocation } from 'react-router-dom';
import { User, Heart, PenLine, Lock, LogOut, LayoutGrid } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function UserAccountBar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const tabs = [
    { label: 'My Ads', icon: <LayoutGrid size={14} />, to: '/account' },
    { label: 'Saved', icon: <Heart size={14} />, to: '/favorites' },
    { label: 'Profile', icon: <PenLine size={14} />, to: '/editprofile' },
    { label: 'Password', icon: <Lock size={14} />, to: '/changepass' },
  ];

  return (
    <div className="card mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 text-gray-700">
          <User size={18} className="text-gray-500" />
          <span className="text-[14px] font-semibold">{user?.name}</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {tabs.map(tab => {
            const active = pathname === tab.to;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`flex items-center gap-1 text-[13px] transition-colors ${
                  active ? 'text-[#00b4d8] font-semibold' : 'text-gray-500 hover:text-[#00b4d8]'
                }`}
              >
                {tab.icon} {tab.label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex items-center gap-1 text-[13px] text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
