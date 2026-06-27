import { useState } from 'react';
import styles from './ActivityCard.module.css';
import { useTrip } from '../context/TripContext';

const ActivityCard = ({ activity, dayId, isCurrent, isNext, isPast, isEditing }) => {
  const { toggleActivityCompletion, updateActivity } = useTrip();
  const [editData, setEditData] = useState({ ...activity });

  let statusClass = '';
  if (isPast) statusClass = styles.past;
  if (isCurrent) statusClass = styles.current;
  if (isNext) statusClass = styles.next;

  const handleSave = () => {
    updateActivity(dayId, activity.id, editData);
  };

  const handleBlur = () => {
    if (editData.title !== activity.title || editData.time !== activity.time || editData.endTime !== activity.endTime || editData.location !== activity.location) {
      handleSave();
    }
  };

  return (
    <div className={`${styles.cardWrapper} animate-fade-in`}>
      <div className={styles.timeline}>
        <div className={`${styles.dot} ${statusClass}`}></div>
        <div className={`${styles.line} ${isPast ? styles.linePast : ''}`}></div>
      </div>
      <div className={`glass-card ${styles.card} ${statusClass}`}>
        
        {isEditing ? (
          <div className={styles.editMode}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input 
                type="time" 
                value={editData.time} 
                onChange={e => setEditData({...editData, time: e.target.value})}
                onBlur={handleBlur}
                className={styles.editInput}
              />
              <span>-</span>
              <input 
                type="time" 
                value={editData.endTime} 
                onChange={e => setEditData({...editData, endTime: e.target.value})}
                onBlur={handleBlur}
                className={styles.editInput}
              />
            </div>
            <input 
              type="text" 
              value={editData.title} 
              onChange={e => setEditData({...editData, title: e.target.value})}
              onBlur={handleBlur}
              className={`${styles.editInput} ${styles.titleInput}`}
              placeholder="Tên hoạt động"
            />
            <input 
              type="text" 
              value={editData.location} 
              onChange={e => setEditData({...editData, location: e.target.value})}
              onBlur={handleBlur}
              className={styles.editInput}
              placeholder="Địa điểm"
            />
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <span className={styles.time}>{activity.time} - {activity.endTime}</span>
              {isCurrent && <span className={styles.badge}>HAPPENING NOW</span>}
              {isNext && <span className={`${styles.badge} ${styles.badgeNext}`}>NEXT</span>}
            </div>
            <h3 className={styles.title}>{activity.title}</h3>
            <p className={styles.location}>📍 {activity.location}</p>
          </>
        )}
        
        <div className={styles.actions} style={{ marginTop: isEditing ? '1rem' : '0' }}>
          <label className={styles.checkboxContainer}>
            <input 
              type="checkbox" 
              checked={activity.completed} 
              onChange={() => toggleActivityCompletion(dayId, activity.id)}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.checkLabel}>
              {activity.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
