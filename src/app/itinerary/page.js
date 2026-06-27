"use client";

import { useTrip } from "../../context/TripContext";
import ActivityCard from "../../components/ActivityCard";
import styles from "./page.module.css";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

export default function ItineraryPage() {
  const { tripData, isLoaded, getCurrentStatus } = useTrip();

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Loading itinerary…</p>
      </div>
    );
  }

  const { currentActivity, todayData } = getCurrentStatus();
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <main className="container animate-fade-in">
      {/* Page header */}
      <header className="page-header" style={{ marginTop: "1rem" }}>
        <h1 className="page-title neon-text">Timeline</h1>
        <p className="page-subtitle">4-Day Singapore Adventure</p>
      </header>

      {/* Days */}
      <div className="stagger">
        {tripData.map((day) => {
          const isToday = day.date === todayStr;
          const completedCount = day.activities.filter((a) => a.completed).length;
          const totalCount = day.activities.length;
          const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          const dateLabel = new Date(day.date + "T00:00:00").toLocaleDateString("en-SG", {
            weekday: "short", month: "short", day: "numeric",
          });

          return (
            <section key={day.id} className={`${styles.daySection} animate-fade-in`}>
              {/* Day header */}
              <div className={`${styles.dayHeader} ${isToday ? styles.dayHeaderToday : ""}`}>
                <div className={styles.dayMeta}>
                  <div className={styles.dayTop}>
                    {isToday && (
                      <span className={styles.todayPill}>
                        <SunIcon /> Today
                      </span>
                    )}
                    <span className={styles.dateStr}>{dateLabel}</span>
                  </div>
                  <h2 className={styles.dayTitle}>{day.title}</h2>
                </div>

                {/* Day progress */}
                <div className={styles.dayProgress}>
                  <div className={styles.dayProgressHeader}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Progress</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                      {completedCount}/{totalCount}
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className={styles.activities}>
                {day.activities.map((activity) => {
                  const isCurrent = isToday && currentActivity?.id === activity.id;
                  return (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      dayId={day.id}
                      isCurrent={isCurrent}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
