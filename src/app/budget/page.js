"use client";

import { useState } from 'react';
import { useTrip } from '../../context/TripContext';

export default function BudgetPage() {
  const { budgetData, isLoaded, addBudgetItem, updateBudgetItem, deleteBudgetItem } = useTrip();
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', amount: '', icon: '💵', date: '', description: '' });

  if (!isLoaded) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  const total = budgetData.reduce((sum, item) => sum + Number(item.amount), 0);
  // Estimate exchange rate (SGD to VND roughly 18500 or USD to VND roughly 25000)
  // Let's assume the currency is USD for the sake of the initial design
  const totalVND = total * 25000;

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.amount) {
      addBudgetItem({ ...newItem, amount: Number(newItem.amount) });
      setNewItem({ name: '', amount: '', icon: '💵', date: '', description: '' });
    }
  };

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: '2rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Ngân sách</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Theo dõi chi tiêu chuyến đi</p>
        </div>
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

      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tổng chi tiêu dự kiến</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)' }}>${total.toLocaleString()}</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>~ {totalVND.toLocaleString()} VNĐ</p>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Danh mục</h3>
          
          {budgetData.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', padding: '8px 0', borderBottom: isEditing ? '1px dashed var(--glass-border)' : 'none' }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, marginRight: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={item.icon || ''} 
                      onChange={e => updateBudgetItem(item.id, { icon: e.target.value })}
                      style={{ width: '40px', padding: '4px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={e => updateBudgetItem(item.id, { name: e.target.value })}
                      style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                    <input 
                      type="number" 
                      value={item.amount} 
                      onChange={e => updateBudgetItem(item.id, { amount: Number(e.target.value) })}
                      style={{ width: '70px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                    <button onClick={() => deleteBudgetItem(item.id)} style={{ color: 'var(--accent-danger)' }}>🗑️</button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="date" 
                      value={item.date || ''} 
                      onChange={e => updateBudgetItem(item.id, { date: e.target.value })}
                      style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                    <input 
                      type="text" 
                      value={item.description || ''} 
                      placeholder="Mô tả..."
                      onChange={e => updateBudgetItem(item.id, { description: e.target.value })}
                      style={{ flex: 2, padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.icon} {item.name}</span>
                    <span style={{ fontWeight: 600 }}>${item.amount.toLocaleString()}</span>
                  </div>
                  {(item.date || item.description) && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', marginLeft: '24px', display: 'flex', gap: '10px' }}>
                      {item.date && <span>📅 {item.date}</span>}
                      {item.description && <span>📝 {item.description}</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <form onSubmit={handleAdd} style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Thêm mục mới</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    value={newItem.icon} 
                    onChange={e => setNewItem({...newItem, icon: e.target.value})}
                    placeholder="Icon"
                    style={{ width: '40px', padding: '6px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                  <input 
                    type="text" 
                    value={newItem.name} 
                    onChange={e => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Tên danh mục"
                    required
                    style={{ flex: 1, padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                  <input 
                    type="number" 
                    value={newItem.amount} 
                    onChange={e => setNewItem({...newItem, amount: e.target.value})}
                    placeholder="$"
                    required
                    style={{ width: '70px', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="date" 
                    value={newItem.date} 
                    onChange={e => setNewItem({...newItem, date: e.target.value})}
                    style={{ flex: 1, padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                  <input 
                    type="text" 
                    value={newItem.description} 
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Mô tả..."
                    style={{ flex: 2, padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                  <button type="submit" style={{ padding: '6px 12px', background: 'var(--accent-secondary)', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>+</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
