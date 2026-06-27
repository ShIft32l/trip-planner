"use client";

import { useState } from "react";
import { useTrip } from "../../context/TripContext";
import { useLanguage } from "../../context/LanguageContext";
import { CATEGORIES, CATEGORY_LIST } from "../../data/initialTripData";
import styles from "./page.module.css";

/* SVG icons */
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const fmt = (n) => `S$${Number(n).toFixed(2)}`;
const fmtShort = (n) => `S$${Number(n).toLocaleString()}`;

export default function BudgetPage() {
  const { expenses, addExpense, deleteExpense, tripBudget, totalSpent, isLoaded } = useTrip();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", category: "food", notes: "" });

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  const { total: totalBudget } = tripBudget;
  const remaining = totalBudget - totalSpent;
  const pct = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount) return;
    addExpense({ name: form.name, amount: parseFloat(form.amount), category: form.category, notes: form.notes });
    setForm({ name: "", amount: "", category: "food", notes: "" });
    setShowModal(false);
  };

  return (
    <>
      <main className="container animate-fade-in">
        {/* Header */}
        <header className="page-header" style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="page-title neon-text">{t.budget.title}</h1>
            <p className="page-subtitle">{t.budget.subtitle}</p>
          </div>
          <button
            id="add-expense-btn"
            className="btn btn-neon"
            onClick={() => setShowModal(true)}
            aria-label="Add expense"
            style={{ borderRadius: "50px", padding: "0.65rem 1.1rem", gap: "0.35rem", fontSize: "0.85rem" }}
          >
            <PlusIcon /> {t.common.add}
          </button>
        </header>

        {/* === Summary Card === */}
        <div className={`glass-card ${styles.summaryCard}`}>
          <div className={styles.summaryTop}>
            <div>
              <p className={styles.summaryLabel}>{t.budget.totalSpent}</p>
              <p className={styles.summaryAmount}>{fmtShort(totalSpent)}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p className={styles.summaryLabel}>{t.budget.remaining}</p>
              <p className={`${styles.summaryAmount} ${remaining < 0 ? styles.over : styles.under}`}>
                {remaining < 0 ? "-" : ""}{fmtShort(Math.abs(remaining))}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {t.budget.ofBudget(fmtShort(totalSpent), fmtShort(totalBudget))}
              </span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: pct > 90 ? "var(--accent-danger)" : "var(--accent-primary)" }}>
                {pct}%
              </span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${pct}%`,
                  background: pct > 90
                    ? "linear-gradient(90deg, #ef4444, #f97316)"
                    : undefined,
                }}
              />
            </div>
          </div>

          {/* Category breakdown */}
          {expenses.length > 0 && (
            <div className={styles.breakdown}>
              {CATEGORY_LIST.map(({ key }) => {
                const catTotal = expenses.filter((e) => e.category === key).reduce((s, e) => s + Number(e.amount), 0);
                if (catTotal === 0) return null;
                const catPct = Math.round((catTotal / totalSpent) * 100);
                const label = t.categories[key] || key;
                return (
                  <div key={key} className={styles.breakdownRow}>
                    <span className={`tag tag-${key}`}>{label}</span>
                    <div className={styles.breakdownBar}>
                      <div className={styles.breakdownFill} style={{ width: `${catPct}%` }} />
                    </div>
                    <span className={styles.breakdownAmt}>{fmt(catTotal)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* === Recent Expenses === */}
        <section style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
            {t.budget.recent}
          </h2>

          {expenses.length === 0 ? (
            <div className={`glass-card ${styles.empty}`}>
              <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
                {t.budget.noExpenses}
              </p>
            </div>
          ) : (
            <div className="stagger">
              {expenses.map((exp) => {
                const catLabel = t.categories[exp.category] || t.categories.sightseeing;
                return (
                  <div key={exp.id} className={`glass-card ${styles.expenseRow} animate-fade-in`}>
                    <div className={styles.expLeft}>
                      <p className={styles.expName}>{exp.name}</p>
                      {exp.notes && <p className={styles.expNotes}>{exp.notes}</p>}
                      <span className={`tag tag-${exp.category || "sightseeing"}`}>{catLabel}</span>
                    </div>
                    <div className={styles.expRight}>
                      <p className={styles.expAmount}>{fmt(exp.amount)}</p>
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="btn btn-danger"
                        aria-label={`Delete ${exp.name}`}
                        id={`del-exp-${exp.id}`}
                        style={{ padding: "0.4rem", minHeight: 36, borderRadius: 8 }}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* === Add Expense Modal === */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} id="expense-modal-overlay">
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()} id="expense-modal">
            <div className="modal-handle" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{t.budget.addExpense}</h2>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)", cursor: "pointer", padding: "4px" }} aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Amount */}
              <div>
                <label className="form-label" htmlFor="exp-amount">{t.common.amount}</label>
                <input
                  id="exp-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="form-input"
                  style={{ fontSize: "1.5rem", fontWeight: 700, textAlign: "center" }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="form-label" htmlFor="exp-name">{t.common.description}</label>
                <input
                  id="exp-name"
                  type="text"
                  placeholder={t.budget.whatSpentOn}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* Category */}
              <div>
                <label className="form-label">{t.common.category}</label>
                <div className={styles.catGrid}>
                  {CATEGORY_LIST.map(({ key }) => (
                    <button
                      key={key}
                      type="button"
                      id={`cat-${key}`}
                      className={`${styles.catBtn} ${form.category === key ? styles.catBtnActive : ""}`}
                      onClick={() => setForm({ ...form, category: key })}
                    >
                      <span className={`tag tag-${key}`}>{t.categories[key] || key}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="form-label" htmlFor="exp-notes">{t.common.notes} (optional)</label>
                <input
                  id="exp-notes"
                  type="text"
                  placeholder="e.g. Marina Bay Sands restaurant"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary" id="submit-expense-btn" style={{ width: "100%", marginTop: "0.5rem", borderRadius: "12px" }}>
                {t.common.save}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
