"use client";

import { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import ActivityCard from '../../components/ActivityCard';
import ProgressBar from '../../components/ProgressBar';

export default function Itinerary() {
  const { tripData, isLoaded } = useTrip();
  const [isEditing, setIsEditing] = useState(false);

  if (!isLoaded) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: '2rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>
          Lịch trình 4 Ngày
        </h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          style={{ 
            color: isEditing ? 'var(--bg-primary)' : 'white', 
            backgroundColor: isEditing ? 'var(--text-primary)' : 'var(--accent-primary)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
        >
          {isEditing ? 'Xong' : 'Sửa'}
        </button>
      </header>

      {tripData.map((day) => (
        <section key={day.id} style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
            {day.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <ProgressBar dayData={day} />

          <div style={{ marginTop: '1.5rem' }}>
            {day.activities.map((activity) => (
              <ActivityCard 
                key={activity.id}
                activity={activity} 
                dayId={day.id} 
                isEditing={isEditing}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
