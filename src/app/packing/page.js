"use client";

import { useState } from 'react';

export default function PackingPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Hộ chiếu & Visa', checked: false },
    { id: 2, name: 'Vé máy bay khứ hồi', checked: false },
    { id: 3, name: 'Xác nhận đặt phòng khách sạn', checked: false },
    { id: 4, name: 'Quần áo mát mẻ (4-5 bộ)', checked: false },
    { id: 5, name: 'Giày thể thao đi bộ', checked: false },
    { id: 6, name: 'Kem chống nắng', checked: false },
    { id: 7, name: 'Ổ cắm điện đa năng (loại G)', checked: false },
    { id: 8, name: 'Sim 4G / eSIM', checked: false },
    { id: 9, name: 'Thẻ tín dụng / Tiền mặt SGD', checked: false },
  ]);

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Hành lý</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Danh sách đồ cần chuẩn bị</p>
      </header>

      <div className="glass-card">
        {items.map(item => (
          <label 
            key={item.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '12px 0',
              borderBottom: '1px solid var(--glass-border)',
              cursor: 'pointer'
            }}
          >
            <input 
              type="checkbox" 
              checked={item.checked} 
              onChange={() => toggleItem(item.id)}
              style={{
                width: '20px',
                height: '20px',
                marginRight: '12px',
                accentColor: 'var(--accent-primary)'
              }}
            />
            <span style={{ 
              fontSize: '1rem', 
              color: item.checked ? 'var(--text-secondary)' : 'var(--text-primary)',
              textDecoration: item.checked ? 'line-through' : 'none',
              transition: 'all 0.2s ease'
            }}>
              {item.name}
            </span>
          </label>
        ))}
      </div>
    </main>
  );
}
