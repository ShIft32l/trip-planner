export default function MapPage() {
  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Bản đồ</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Các địa điểm trong lịch trình</p>
      </header>

      <div className="glass-card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</span>
        <h3 style={{ marginBottom: '0.5rem' }}>Map View Placeholder</h3>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
          Tích hợp Google Maps hoặc Mapbox sẽ được thêm ở đây.
        </p>
      </div>
    </main>
  );
}
