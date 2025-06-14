
import { NavLink } from 'react-router-dom';
import { Coin, Wallet, Trophy, Users, Rocket } from 'lucide-react';

export const Navbar = () => {
  const navItems = [
    { path: '/', icon: Coin, label: 'Home' },
    { path: '/watch', icon: Rocket, label: 'Watch' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/referral', icon: Users, label: 'Referral' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card mx-4 mb-4 rounded-2xl">
      <div className="flex items-center justify-around py-3">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-cyan-400 bg-cyan-400/20 glow-effect'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
