import styles from './ProgressBar.module.css';

const ProgressBar = ({ dayData }) => {
  if (!dayData || !dayData.activities || dayData.activities.length === 0) return null;

  const total = dayData.activities.length;
  const completed = dayData.activities.filter(a => a.completed).length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Tiến độ hôm nay</span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      <div className={styles.progressBg}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
