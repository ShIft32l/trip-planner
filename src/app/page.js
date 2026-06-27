"use client";

import { useState, useEffect } from 'react';
import { useTrip } from '../context/TripContext';
import ActivityCard from '../components/ActivityCard';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const { isLoaded, getCurrentStatus } = useTrip();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      // Update status every minute
      const update = () => setStatus(getCurrentStatus());
      update();
      const interval = setInterval(update, 60000);
      return () => clearInterval(interval);
    }
  }, [isLoaded, getCurrentStatus]);

  if (!isLoaded || !status) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  const { todayData, currentActivity, nextActivity, previousActivity } = status;

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          Hôm nay
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      {todayData ? (
        <>
          <ProgressBar dayData={todayData} />
          
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Lịch trình hiện tại
            </h2>
            
            {previousActivity && (
              <ActivityCard 
                activity={previousActivity} 
                dayId={todayData.id} 
                isPast={true} 
              />
            )}

            {currentActivity ? (
              <ActivityCard 
                activity={currentActivity} 
                dayId={todayData.id} 
                isCurrent={true} 
              />
            ) : nextActivity ? (
              <div className="glass-card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Hiện tại đang là thời gian tự do</p>
              </div>
            ) : (
              <div className="glass-card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Bạn đã hoàn thành lịch trình hôm nay!</p>
              </div>
            )}

            {nextActivity && (
              <ActivityCard 
                activity={nextActivity} 
                dayId={todayData.id} 
                isNext={true} 
              />
            )}
          </div>
        </>
      ) : (
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Không có lịch trình</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Hôm nay bạn không có hoạt động nào trong kế hoạch.</p>
        </div>
      )}
    </main>
  );
}
