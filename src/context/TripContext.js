"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateInitialTripData } from '../data/initialTripData';

const TripContext = createContext();

export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage or initialize
  useEffect(() => {
    // Load Trip Data
    const savedTripData = localStorage.getItem('sgTripData');
    if (savedTripData) {
      setTripData(JSON.parse(savedTripData));
    } else {
      const initialData = generateInitialTripData();
      setTripData(initialData);
      localStorage.setItem('sgTripData', JSON.stringify(initialData));
    }

    // Load Budget Data
    const savedBudgetData = localStorage.getItem('sgBudgetData');
    if (savedBudgetData) {
      setBudgetData(JSON.parse(savedBudgetData));
    } else {
      const initialBudget = [
        { id: "1", name: "Vé máy bay", icon: "✈️", amount: 200 },
        { id: "2", name: "Khách sạn", icon: "🏨", amount: 300 },
        { id: "3", name: "Vé tham quan", icon: "🎢", amount: 150 },
        { id: "4", name: "Ăn uống", icon: "🍜", amount: 150 },
        { id: "5", name: "Di chuyển", icon: "🚆", amount: 50 },
      ];
      setBudgetData(initialBudget);
      localStorage.setItem('sgBudgetData', JSON.stringify(initialBudget));
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever tripData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sgTripData', JSON.stringify(tripData));
    }
  }, [tripData, isLoaded]);

  // Save to localStorage whenever budgetData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sgBudgetData', JSON.stringify(budgetData));
    }
  }, [budgetData, isLoaded]);

  const toggleActivityCompletion = (dayId, activityId) => {
    setTripData(prevData => 
      prevData.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.map(activity => 
              activity.id === activityId 
                ? { ...activity, completed: !activity.completed }
                : activity
            )
          };
        }
        return day;
      })
    );
  };

  const updateActivity = (dayId, activityId, updatedFields) => {
    setTripData(prevData => 
      prevData.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.map(activity => 
              activity.id === activityId 
                ? { ...activity, ...updatedFields }
                : activity
            )
          };
        }
        return day;
      })
    );
  };

  // Real-time tracking logic
  const getCurrentStatus = () => {
    const now = new Date();
    // To test easily, you can override 'now' with a specific date:
    // const now = new Date("2026-06-25T14:30:00"); 

    let currentActivity = null;
    let nextActivity = null;
    let previousActivity = null;
    let todayData = null;

    const todayStr = now.toISOString().split('T')[0];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (let day of tripData) {
      if (day.date === todayStr) {
        todayData = day;
        for (let i = 0; i < day.activities.length; i++) {
          const activity = day.activities[i];
          const [startH, startM] = activity.time.split(':').map(Number);
          const [endH, endM] = activity.endTime.split(':').map(Number);
          const startMinutes = startH * 60 + startM;
          const endMinutes = endH * 60 + endM;

          if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
            currentActivity = { ...activity, dayId: day.id };
            previousActivity = i > 0 ? { ...day.activities[i - 1], dayId: day.id } : null;
            nextActivity = i < day.activities.length - 1 ? { ...day.activities[i + 1], dayId: day.id } : null;
            break;
          } else if (currentMinutes < startMinutes && !nextActivity) {
            // Found the next upcoming activity if we are in free time
            nextActivity = { ...activity, dayId: day.id };
            previousActivity = i > 0 ? { ...day.activities[i - 1], dayId: day.id } : null;
            break; // Stop after finding the first upcoming
          }
        }
        
        // If all activities for today are past
        if (!currentActivity && !nextActivity && day.activities.length > 0) {
           const lastIdx = day.activities.length - 1;
           const [endH, endM] = day.activities[lastIdx].endTime.split(':').map(Number);
           if (currentMinutes >= endH * 60 + endM) {
              previousActivity = { ...day.activities[lastIdx], dayId: day.id };
           }
        }
        break; // Found today, stop checking other days
      }
    }

    return { todayData, currentActivity, nextActivity, previousActivity };
  };

  // Budget Management Functions
  const addBudgetItem = (item) => {
    setBudgetData(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const updateBudgetItem = (id, updatedFields) => {
    setBudgetData(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
  };

  const deleteBudgetItem = (id) => {
    setBudgetData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <TripContext.Provider value={{ 
      tripData, 
      setTripData, 
      budgetData,
      setBudgetData,
      isLoaded, 
      toggleActivityCompletion, 
      updateActivity,
      getCurrentStatus,
      addBudgetItem,
      updateBudgetItem,
      deleteBudgetItem
    }}>
      {children}
    </TripContext.Provider>
  );
};
