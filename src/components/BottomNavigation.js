"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNavigation.module.css";
import { useLanguage } from "../context/LanguageContext";

/* SVG Icons — no emojis */
const TodayIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const TimelineIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const BudgetIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const MapIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);

const navConfig = [
  { key: "today",    path: "/",          Icon: TodayIcon },
  { key: "timeline", path: "/itinerary", Icon: TimelineIcon },
  { key: "budget",   path: "/budget",    Icon: BudgetIcon },
  { key: "map",      path: "/map",       Icon: MapIcon },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {navConfig.map(({ key, path, Icon }) => {
        const active = pathname === path;
        const name = t.nav[key];
        return (
          <Link
            href={path}
            key={key}
            id={`nav-${key}`}
            className={`${styles.item} ${active ? styles.active : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <span className={styles.iconWrap}>
              <Icon active={active} />
              {active && <span className={styles.glow} />}
            </span>
            <span className={styles.label}>{name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
