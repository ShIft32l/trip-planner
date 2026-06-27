"use client";

import { useState, useEffect } from "react";
import { useTrip } from "../context/TripContext";
import ActivityCard from "../components/ActivityCard";
import styles from "./page.module.css";

/* ── SVG Icons ── */
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const PlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-1 0-1.5.5-3.5 2.5L9 3l-1.8 1.8 6.4 3.5-4.3 4.3-2.5-.5L5 13.5 9 15l1.5 4 1.5-1.5-.5-2.5 4.3-4.3 3.5 6.4 1.5-1.9z"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

/* ── Trip countdown ── */
function useTripCountdown(startDate) {
  const [daysUntil, setDaysUntil] = useState(null);

  useEffect(() => {
    const tripStart = new Date(startDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24));
    setDaysUntil(diff);
  }, [startDate]);

  return daysUntil;
}

export default function TodayPage() {
  const { isLoaded, getCurrentStatus, darkMode, toggleDarkMode, tripData } = useTrip();
  const [status, setStatus] = useState(null);
  const [now, setNow] = useState(new Date());

  // Update every minute
  useEffect(() => {
    if (!isLoaded) return;
    const update = () => {
      setStatus(getCurrentStatus());
      setNow(new Date());
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [isLoaded, getCurrentStatus]);

  const daysUntil = useTripCountdown("2026-07-10");

  if (!isLoaded || !status) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Loading…</p>
      </div>
    );
  }

  const { todayData, currentActivity, nextActivity, previousActivity } = status;

  const timeStr = now.toLocaleTimeString("en-SG", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-SG", { weekday: "long", month: "long", day: "numeric" });

  const completedCount = todayData?.activities?.filter((a) => a.completed).length ?? 0;
  const totalCount = todayData?.activities?.length ?? 0;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Figure out which trip day we're on
  const todayStr = now.toISOString().split("T")[0];
  const dayIndex = tripData.findIndex((d) => d.date === todayStr);
  const isOnTrip = dayIndex !== -1;

  // Pre-trip view
  if (!isOnTrip && daysUntil !== null && daysUntil > 0) {
    return (
      <main className="container animate-fade-in">
        <header className={styles.topBar}>
          <div>
            <h1 className={styles.greeting}><span className="neon-text">SG Trip</span></h1>
            <p className={styles.subDate}><CalendarIcon /> {dateStr}</p>
          </div>
          <button id="dark-mode-toggle" className={styles.themeBtn} onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        {/* Countdown */}
        <div className={`glass-card ${styles.countdownCard}`}>
          <div className={styles.countdownTop}>
            <PlaneIcon />
            <span className={styles.countdownLabel}>Your trip starts in</span>
          </div>
          <div className={styles.countdownNum}>{daysUntil}</div>
          <div className={styles.countdownUnit}>days</div>
          <p className={styles.countdownDate}>
            10 Jul – 13 Jul 2026 · Singapore 🇸🇬
          </p>
        </div>

        {/* Flight info */}
        <div className={styles.flightSection}>
          <h2 className={styles.sectionTitle}>Your Flights</h2>
          <div className={`glass-card ${styles.flightCard}`}>
            <div className={styles.flightRow}>
              <div className={styles.flightInfo}>
                <span className={`tag tag-transport`}>Outbound</span>
                <p className={styles.flightRoute}>SGN → SIN</p>
                <p className={styles.flightDetail}>VietJet Air · Fri 10 Jul · 11:10</p>
                <p className={styles.flightAirport}>Tan Son Nhat Intl Airport</p>
              </div>
              <PlaneIcon />
            </div>
          </div>
          <div className={`glass-card ${styles.flightCard}`} style={{ marginTop: "0.75rem" }}>
            <div className={styles.flightRow}>
              <div className={styles.flightInfo}>
                <span className={`tag tag-transport`}>Return</span>
                <p className={styles.flightRoute}>SIN → SGN</p>
                <p className={styles.flightDetail}>Vietnam Airlines · Mon 13 Jul · 18:25</p>
                <p className={styles.flightAirport}>Changi International Airport</p>
              </div>
              <PlaneIcon />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Post-trip view
  if (!isOnTrip && daysUntil !== null && daysUntil < 0) {
    return (
      <main className="container animate-fade-in">
        <header className={styles.topBar}>
          <h1 className={styles.greeting}><span className="neon-text">Trip Complete!</span></h1>
          <button id="dark-mode-toggle" className={styles.themeBtn} onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>
        <div className={`glass-card ${styles.doneCard}`}>
          <CheckCircleIcon />
          <h2>Singapore Adventure Done!</h2>
          <p>Hope you had an amazing time in the Lion City.</p>
        </div>
      </main>
    );
  }

  // ── On-trip view ──────────────────────────────────────────────
  return (
    <main className="container animate-fade-in">
      {/* Top bar */}
      <header className={styles.topBar}>
        <div>
          <h1 className={styles.greeting}>
            <span className="neon-text">Today</span>
            <span className={styles.dayBadge}>Day {dayIndex + 1}</span>
          </h1>
          <p className={styles.subDate}><CalendarIcon /> {dateStr}</p>
        </div>
        <div className={styles.topRight}>
          <div className={styles.liveClock}>
            <ClockIcon />
            <span>{timeStr}</span>
          </div>
          <button id="dark-mode-toggle" className={styles.themeBtn} onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* Progress card */}
      {todayData && (
        <div className={`glass-card ${styles.progressCard}`}>
          <div className={styles.progressHeader}>
            <div>
              <p className={styles.progressLabel}>Today&apos;s Progress</p>
              <p className={styles.progressSub}>{todayData.title}</p>
            </div>
            <span className={styles.progressPct}>{pct}%</span>
          </div>
          <div className="progress-bar-track" style={{ marginTop: "0.85rem" }}>
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p style={{ fontSize: "0.73rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            {completedCount} of {totalCount} activities completed
          </p>
        </div>
      )}

      {/* ── Now & Next ── */}
      {todayData ? (
        <section className={styles.nowSection}>
          {/* CURRENT */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.nowDot} />
              Happening Now
            </h2>
            {currentActivity ? (
              <ActivityCard
                activity={currentActivity}
                dayId={todayData.id}
                isCurrent
              />
            ) : (
              <div className={`glass-card ${styles.emptySlot}`}>
                <p>
                  {nextActivity
                    ? "Free time right now — next activity coming up!"
                    : "All done for today! Enjoy your evening 🌙"}
                </p>
              </div>
            )}
          </div>

          {/* NEXT */}
          {nextActivity && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.nextDot} />
                Up Next
              </h2>
              <ActivityCard
                activity={nextActivity}
                dayId={todayData.id}
                isNext
              />
            </div>
          )}

          {/* PREVIOUS (collapsed, for context) */}
          {previousActivity && !currentActivity && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle} style={{ color: "var(--text-muted)" }}>
                Just Finished
              </h2>
              <ActivityCard
                activity={previousActivity}
                dayId={todayData.id}
                isPast
              />
            </div>
          )}
        </section>
      ) : (
        <div className={`glass-card ${styles.noSchedule}`}>
          <h2>No schedule for today</h2>
          <p>Check the Timeline tab for the full itinerary.</p>
        </div>
      )}
    </main>
  );
}
