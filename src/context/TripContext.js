"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { generateInitialTripData, INITIAL_BUDGET } from "../data/initialTripData";

const TripContext = createContext();
export const useTrip = () => useContext(TripContext);

// Bump this whenever the data model changes to auto-clear stale localStorage
const DATA_VERSION = "v3-jul2026";

export const TripProvider = ({ children }) => {
  const [tripData, setTripData]     = useState([]);
  const [expenses, setExpenses]     = useState([]);
  const [tripBudget, setTripBudget] = useState(INITIAL_BUDGET);
  const [isLoaded, setIsLoaded]     = useState(false);
  const [darkMode, setDarkMode]     = useState(false);

  // ── Bootstrap ─────────────────────────────────────────────
  useEffect(() => {
    // Clear stale data if version mismatch
    const savedVersion = localStorage.getItem("sgDataVersion");
    if (savedVersion !== DATA_VERSION) {
      localStorage.removeItem("sgTripData_v2");
      localStorage.removeItem("sgExpenses");
      localStorage.removeItem("sgTripBudget");
      localStorage.setItem("sgDataVersion", DATA_VERSION);
    }

    // Trip schedule
    const saved = localStorage.getItem("sgTripData_v2");
    setTripData(saved ? JSON.parse(saved) : generateInitialTripData());

    // Expenses log
    const savedExp = localStorage.getItem("sgExpenses");
    setExpenses(savedExp ? JSON.parse(savedExp) : []);

    // Budget config
    const savedBudget = localStorage.getItem("sgTripBudget");
    setTripBudget(savedBudget ? JSON.parse(savedBudget) : INITIAL_BUDGET);

    // Theme
    const theme = localStorage.getItem("sg-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme ? theme === "dark" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

    setIsLoaded(true);
  }, []);

  // ── Persist trip data ──────────────────────────────────────
  useEffect(() => {
    if (isLoaded) localStorage.setItem("sgTripData_v2", JSON.stringify(tripData));
  }, [tripData, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("sgExpenses", JSON.stringify(expenses));
  }, [expenses, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("sgTripBudget", JSON.stringify(tripBudget));
  }, [tripBudget, isLoaded]);

  // ── Theme toggle ───────────────────────────────────────────
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("sg-theme", next ? "dark" : "light");
  };

  // ── Activity helpers ───────────────────────────────────────
  const toggleActivityCompletion = (dayId, activityId) => {
    setTripData((prev) =>
      prev.map((day) =>
        day.id !== dayId
          ? day
          : {
              ...day,
              activities: day.activities.map((a) =>
                a.id === activityId ? { ...a, completed: !a.completed } : a
              ),
            }
      )
    );
  };

  const updateActivity = (dayId, activityId, fields) => {
    setTripData((prev) =>
      prev.map((day) =>
        day.id !== dayId
          ? day
          : {
              ...day,
              activities: day.activities.map((a) =>
                a.id === activityId ? { ...a, ...fields } : a
              ),
            }
      )
    );
  };

  // ── Real-time status ───────────────────────────────────────
  const getCurrentStatus = useCallback(() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const curMin = now.getHours() * 60 + now.getMinutes();

    let todayData = null, currentActivity = null, nextActivity = null, previousActivity = null;

    for (const day of tripData) {
      if (day.date !== todayStr) continue;
      todayData = day;

      for (let i = 0; i < day.activities.length; i++) {
        const act = day.activities[i];
        const [sh, sm] = act.time.split(":").map(Number);
        const [eh, em] = act.endTime.split(":").map(Number);
        const start = sh * 60 + sm;
        const end   = eh * 60 + em;

        if (curMin >= start && curMin < end) {
          currentActivity  = { ...act, dayId: day.id };
          previousActivity = i > 0 ? { ...day.activities[i - 1], dayId: day.id } : null;
          nextActivity     = i < day.activities.length - 1 ? { ...day.activities[i + 1], dayId: day.id } : null;
          break;
        } else if (curMin < start && !nextActivity) {
          nextActivity     = { ...act, dayId: day.id };
          previousActivity = i > 0 ? { ...day.activities[i - 1], dayId: day.id } : null;
          break;
        }
      }

      if (!currentActivity && !nextActivity && day.activities.length > 0) {
        const last = day.activities[day.activities.length - 1];
        const [eh, em] = last.endTime.split(":").map(Number);
        if (curMin >= eh * 60 + em) {
          previousActivity = { ...last, dayId: day.id };
        }
      }
      break;
    }

    return { todayData, currentActivity, nextActivity, previousActivity };
  }, [tripData]);

  // ── Expense helpers ────────────────────────────────────────
  const addExpense = (expense) => {
    setExpenses((prev) => [
      { ...expense, id: Date.now().toString(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // ── Budget helpers ─────────────────────────────────────────
  // Legacy — kept for backwards compat, map to expenses
  const addBudgetItem = (item) => addExpense({ ...item, name: item.name, amount: item.amount });
  const deleteBudgetItem = (id) => deleteExpense(id);
  const updateBudgetItem = (id, fields) =>
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...fields } : e)));

  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
        expenses,
        tripBudget,
        setTripBudget,
        totalSpent,
        isLoaded,
        darkMode,
        toggleDarkMode,
        toggleActivityCompletion,
        updateActivity,
        getCurrentStatus,
        addExpense,
        deleteExpense,
        // Legacy compat
        budgetData: expenses,
        addBudgetItem,
        updateBudgetItem,
        deleteBudgetItem,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
