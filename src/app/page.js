"use client";

import { useState, useEffect } from "react";
import { useTrip } from "../context/TripContext";
import ActivityCard from "../components/ActivityCard";
import styles from "./page.module.css";

/* SVG icons */
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const SunIcon2 = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Home() {
  const { isLoaded, getCurrentStatus, darkMode, toggleDarkMode } = useTrip();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    const update = () => setStatus(getCurrentStatus());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [isLoaded, getCurrentStatus]);

  if (!isLoaded || !status) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Loading your trip…</p>
      </div>
    );
  }

  const { todayData, currentActivity, nextActivity, previousActivity } = status;
  const now = new Date();
  const dayLabel = now.toLocaleDateString("en-SG", { weekday: "long", month: "long", day: "numeric" });

  const completedCount = todayData?.activities?.filter((a) => a.completed).length ?? 0;
  const totalCount = todayData?.activities?.length ?? 0;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <main className="container animate-fade-in">
      {/* ── Top bar ── */}
      <header className={styles.topBar}>
        <div>
          <h1 className={styles.greeting}>
            <span className="neon-text">Singapore</span> Trip
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.15rem" }}>
            <PinIcon /> {dayLabel}
          </p>
        </div>
        <button
          id="dark-mode-toggle"
          className={styles.themeBtn}
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <SunIcon2 /> : <MoonIcon />}
        </button>
      </header>

      {todayData ? (
        <>
          {/* ── Today progress card ── */}
          <div className={`glass-card ${styles.progressCard}`}>
            <div className={styles.progressHeader}>
              <div>
                <p className={styles.progressTitle}>Today&apos;s Progress</p>
                <p className={styles.progressSubtitle}>{todayData.title}</p>
              </div>
              <span className={styles.progressPct}>{pct}%</span>
            </div>
            <div className="progress-bar-track" style={{ marginTop: "0.85rem" }}>
              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              {completedCount} of {totalCount} activities done
            </p>
          </div>

          {/* ── Activities ── */}
          <section style={{ marginTop: "1.5rem" }}>
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Now &amp; Next
            </h2>

            {previousActivity && (
              <ActivityCard activity={previousActivity} dayId={todayData.id} isPast />
            )}
            {currentActivity ? (
              <ActivityCard activity={currentActivity} dayId={todayData.id} isCurrent />
            ) : (
              <div className={`glass-card ${styles.freeTime}`}>
                <p>Free time — enjoy Singapore! ☀️</p>
              </div>
            )}
            {nextActivity && (
              <ActivityCard activity={nextActivity} dayId={todayData.id} isNext />
            )}
          </section>
        </>
      ) : (
        <div className={`glass-card ${styles.noTrip}`}>
          <h2>No schedule for today</h2>
          <p>Head to the Timeline tab to see your full itinerary.</p>
        </div>
      )}
    </main>
  );
}
