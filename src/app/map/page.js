"use client";

import { useState } from "react";
import { useTrip } from "../../context/TripContext";
import { useLanguage } from "../../context/LanguageContext";
import { CATEGORY_LIST } from "../../data/initialTripData";
import styles from "./page.module.css";

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px", opacity: 0.7 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function MapPage() {
  const { tripData, isLoaded } = useTrip();
  const { lang, t } = useLanguage();
  const [dayFilter, setDayFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{t.common.loading}</p>
      </div>
    );
  }

  // Flatten all activities with their day info
  const allDestinations = tripData.flatMap((day, index) =>
    day.activities.map((act) => ({
      ...act,
      dayIndex: index + 1,
      dayTitle: lang === "vi" && day.title_vi ? day.title_vi : day.title,
    }))
  );

  // Apply filters
  const filtered = allDestinations.filter((dest) => {
    if (dayFilter !== "all" && dest.dayIndex !== Number(dayFilter)) return false;
    if (typeFilter !== "all" && dest.category !== typeFilter) return false;
    return true;
  });

  return (
    <main className="container animate-fade-in" style={{ paddingBottom: "100px" }}>
      {/* Header */}
      <header className="page-header" style={{ marginTop: "1rem" }}>
        <h1 className="page-title neon-text">{t.map.title}</h1>
        <p className="page-subtitle">{t.map.subtitle}</p>
      </header>

      {/* Filters */}
      <section className={styles.filtersWrapper}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>
            <FilterIcon /> {t.map.day}
          </label>
          <select 
            className="form-input" 
            value={dayFilter} 
            onChange={(e) => setDayFilter(e.target.value)}
          >
            <option value="all">{t.map.allDays}</option>
            {tripData.map((d, i) => (
              <option key={d.id} value={i + 1}>Day {i + 1}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>
            <FilterIcon /> {t.map.type}
          </label>
          <select 
            className="form-input" 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">{t.map.allTypes}</option>
            {CATEGORY_LIST.map(({ key }) => (
              <option key={key} value={key}>{t.categories[key] || key}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Results Header */}
      <p style={{ margin: "1rem 0", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
        {t.map.destination(filtered.length)}
      </p>

      {/* Places List */}
      <div className="stagger">
        {filtered.length === 0 ? (
          <div className="glass-card" style={{ textAlign: "center", padding: "2rem 1rem", color: "var(--text-muted)" }}>
            {t.map.noResults}
          </div>
        ) : (
          filtered.map((dest) => {
            const catLabel = t.categories[dest.category] || t.categories.sightseeing;
            const displayTitle = lang === "vi" && dest.title_vi ? dest.title_vi : dest.title;
            return (
              <a
                href={dest.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={dest.id}
                className={`glass-card ${styles.placeCard} animate-fade-in`}
              >
                <div className={styles.placeHeader}>
                  <h3 className={styles.placeTitle}>
                    {displayTitle} <ExternalLinkIcon />
                  </h3>
                  <span className={`tag tag-${dest.category || "sightseeing"}`}>{catLabel}</span>
                </div>
                <div className={styles.placeLocation}>
                  <LocationIcon />
                  <span>{dest.location}</span>
                </div>
                <div className={styles.placeMeta}>
                  <span className={styles.dayBadge}>Day {dest.dayIndex}</span>
                  <span className={styles.timeBadge}>{dest.time} – {dest.endTime}</span>
                </div>
              </a>
            );
          })
        )}
      </div>
    </main>
  );
}
