import { Package, User } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  {
    to: 'login',
    icon: <User size={24} />
  },
  {
    to: 'packages',
    icon: <Package size={24} />
  }
];

export default function Header() {
  return (
    <header>
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center h-[65px] border-b border-b-neutral-300">
        <a href="/">
          <img src="/logo.svg" alt="logo" />
        </a>
        <nav>
          <ul>
            {navigation.map(({ to, icon }) => (
              <li key={to}>
                <NavLink to={to}>{icon}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
