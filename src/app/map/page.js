"use client";

import { useState } from "react";
import { useTrip } from "../../context/TripContext";
import { CATEGORIES } from "../../data/initialTripData";
import styles from "./page.module.css";

/* SVG icons */
const NavIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);
const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function MapPage() {
  const { tripData, isLoaded } = useTrip();
  const [selectedDay, setSelectedDay] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  // Flatten all activities
  const allActivities = tripData.flatMap((day) =>
    day.activities.map((act) => ({
      ...act,
      dayId: day.id,
      dayTitle: day.title,
      dayDate: day.date,
    }))
  );

  const filtered = allActivities.filter((act) => {
    const dayMatch = selectedDay === "all" || act.dayId === selectedDay;
    const catMatch = selectedCategory === "all" || act.category === selectedCategory;
    return dayMatch && catMatch;
  });

  const uniqueCategories = [...new Set(allActivities.map((a) => a.category))];

  return (
    <main className="container animate-fade-in">
      {/* Header */}
      <header className="page-header" style={{ marginTop: "1rem" }}>
        <h1 className="page-title neon-text">Map</h1>
        <p className="page-subtitle">All Singapore destinations</p>
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        {/* Day filter */}
        <div className={styles.filterRow}>
          <span className={styles.filterLabel}><CalendarIcon /> Day</span>
          <div className={styles.pills}>
            <button
              className={`${styles.pill} ${selectedDay === "all" ? styles.pillActive : ""}`}
              onClick={() => setSelectedDay("all")}
              id="filter-all-days"
            >All</button>
            {tripData.map((d, i) => (
              <button
                key={d.id}
                className={`${styles.pill} ${selectedDay === d.id ? styles.pillActive : ""}`}
                onClick={() => setSelectedDay(d.id)}
                id={`filter-day-${i + 1}`}
              >Day {i + 1}</button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className={styles.filterRow}>
          <span className={styles.filterLabel}>Type</span>
          <div className={styles.pills}>
            <button
              className={`${styles.pill} ${selectedCategory === "all" ? styles.pillActive : ""}`}
              onClick={() => setSelectedCategory("all")}
              id="filter-all-cats"
            >All</button>
            {uniqueCategories.map((cat) => {
              const catInfo = CATEGORIES[cat];
              return (
                <button
                  key={cat}
                  className={`${styles.pill} ${selectedCategory === cat ? styles.pillActive : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                  id={`filter-cat-${cat}`}
                >{catInfo?.label || cat}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Count */}
      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
        {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Location cards */}
      <div className="stagger">
        {filtered.map((act) => {
          const cat = CATEGORIES[act.category] || CATEGORIES.sightseeing;
          const dayIndex = tripData.findIndex((d) => d.id === act.dayId) + 1;

          return (
            <div key={`${act.dayId}-${act.id}`} className={`glass-card ${styles.locationCard} animate-fade-in`}>
              {/* Day tag + category */}
              <div className={styles.cardTop}>
                <span className={styles.dayTag}>Day {dayIndex}</span>
                <span className={`tag tag-${act.category}`}>{cat.label}</span>
                {act.completed && (
                  <span className="badge badge-past">Done</span>
                )}
              </div>

              {/* Title + time */}
              <h3 className={styles.locationTitle}>{act.title}</h3>

              {/* Location */}
              <div className={styles.locationRow}>
                <PinIcon />
                <span className={styles.locationName}>{act.location}</span>
              </div>

              {/* Time */}
              <p className={styles.timeText}>{act.time} – {act.endTime}</p>

              {/* Cost snippet */}
              <div className={styles.bottomRow}>
                <span className={`${styles.costChip} ${act.cost === 0 ? styles.costFree : ""}`}>
                  {act.cost === 0 ? "Free" : `S$${act.cost}`}
                </span>

                {/* Get Directions — the primary CTA */}
                <a
                  href={act.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-directions"
                  id={`map-directions-${act.id}`}
                  aria-label={`Get directions to ${act.location}`}
                >
                  <NavIcon />
                  Get Directions
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
          <p style={{ color: "var(--text-muted)" }}>No destinations match the selected filters.</p>
        </div>
      )}
    </main>
  );
}
