"use client";

import { useState } from "react";
import styles from "./ActivityCard.module.css";
import { useTrip } from "../context/TripContext";
import { useLanguage } from "../context/LanguageContext";
import { CATEGORIES } from "../data/initialTripData";

/* SVG icons */
const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const DirectionsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SGD = (n) => (n === 0 ? "Free" : `S$${n}`);

const DotStatus = ({ isCurrent, isNext, completed }) => {
  if (completed)  return <div className={`${styles.dot} ${styles.dotCompleted}`}><CheckIcon /></div>;
  if (isCurrent)  return <div className={`${styles.dot} ${styles.dotCurrent}`} />;
  if (isNext)     return <div className={`${styles.dot} ${styles.dotNext}`} />;
  return              <div className={`${styles.dot} ${styles.dotDefault}`} />;
};

export default function ActivityCard({ activity, dayId, isCurrent, isNext, isPast }) {
  const { toggleActivityCompletion } = useTrip();
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(isCurrent);

  const cat = CATEGORIES[activity.category] || CATEGORIES.sightseeing;
  const completed = activity.completed;

  const handleDirections = (e) => {
    e.stopPropagation();
    window.open(activity.mapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleCheck = (e) => {
    e.stopPropagation();
    toggleActivityCompletion(dayId, activity.id);
  };

  const displayTitle = lang === "vi" && activity.title_vi ? activity.title_vi : activity.title;
  const displayNotes = lang === "vi" && activity.notes_vi ? activity.notes_vi : activity.notes;
  const catLabel = t.categories[activity.category] || t.categories.sightseeing;

  return (
    <div className={`${styles.wrapper} animate-fade-in`}>
      {/* Timeline spine */}
      <div className={styles.spine}>
        <DotStatus isCurrent={isCurrent} isNext={isNext} completed={completed} />
        <div className={`${styles.line} ${completed ? styles.lineDone : ""}`} />
      </div>

      {/* Card */}
      <button
        className={`${styles.card} ${isCurrent ? styles.cardCurrent : ""} ${isNext ? styles.cardNext : ""} ${completed ? styles.cardDone : ""}`}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        id={`activity-${activity.id}`}
      >
        {/* Header row */}
        <div className={styles.header}>
          <div className={styles.timeRow}>
            <span className={styles.timeIcon}><ClockIcon /></span>
            <span className={styles.time}>{activity.time} – {activity.endTime}</span>
          </div>
          <div className={styles.badges}>
            {isCurrent && <span className="badge badge-current">● {t.common.now}</span>}
            {isNext    && <span className="badge badge-next">{t.common.next}</span>}
            {completed && !isCurrent && !isNext && <span className="badge badge-past">{t.common.done}</span>}
          </div>
        </div>

        <h3 className={`${styles.title} ${completed ? styles.titleDone : ""}`}>
          {displayTitle}
        </h3>

        {/* Location + tag row */}
        <div className={styles.meta}>
          <span className={styles.location}>
            <MapPinIcon /> {activity.location}
          </span>
          <span className={`tag tag-${activity.category || "sightseeing"}`}>
            {catLabel}
          </span>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className={styles.details} onClick={(e) => e.stopPropagation()}>
            {displayNotes && (
              <p className={styles.notes}>{displayNotes}</p>
            )}
            <div className={styles.costRow}>
              <span className={styles.costLabel}>{t.common.estCost}</span>
              <span className={`${styles.cost} ${activity.cost === 0 ? styles.costFree : ""}`}>
                {activity.cost === 0 ? t.common.free : `S$${activity.cost}`}
              </span>
            </div>
            <div className={styles.actions}>
              {/* Get Directions — thumb-friendly */}
              <a
                href={activity.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-directions"
                id={`directions-${activity.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <DirectionsIcon />
                {t.common.getDir}
              </a>

              {/* Complete toggle */}
              <button
                className={`${styles.checkBtn} ${completed ? styles.checkBtnDone : ""}`}
                onClick={handleCheck}
                id={`complete-${activity.id}`}
                aria-label={completed ? "Mark incomplete" : "Mark complete"}
              >
                {completed ? (
                  <><CheckIcon /> {t.common.done}</>
                ) : (
                  <>{t.common.markDone}</>
                )}
              </button>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
