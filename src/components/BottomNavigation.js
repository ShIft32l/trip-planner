"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Today', path: '/', icon: '🕒' },
    { name: 'Itinerary', path: '/itinerary', icon: '📅' },
    { name: 'Map', path: '/map', icon: '📍' },
    { name: 'Budget', path: '/budget', icon: '💰' },
    { name: 'Packing', path: '/packing', icon: '🎒' },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link href={item.path} key={item.name} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.name}</span>
            {isActive && <span className={styles.indicator}></span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
