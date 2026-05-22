import React, { useState } from 'react';
import Card from './Card';
import { Sliders, AlertTriangle, ShieldCheck, DollarSign } from 'lucide-react';

export default function BudgetTracker({ 
  budgets, 
  expensesByCategory, 
  onUpdateBudget 
}) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [tempBudget, setTempBudget] = useState('');

  const categories = [
    { key: 'Comida', label: 'Comida & Restaurantes', emoji: '🍔', color: 'var(--accent-primary)' },
    { key: 'Transporte', label: 'Transporte & Gasolina', emoji: '🚗', color: 'var(--accent-secondary)' },
    { key: 'Hogar', label: 'Hogar, Rentas & Servicios', emoji: '🏠', color: 'var(--color-warning)' },
    { key: 'Entretenimiento', label: 'Entretenimiento & Ocio', emoji: '🎬', color: '#ff79c6' },
    { key: 'Compras', label: 'Compras & Ropa', emoji: '🛍️', color: '#f1fa8c' },
    { key: 'Otros', label: 'Gastos Varios & Otros', emoji: '📦', color: 'var(--text-muted)' }
  ];

  const handleEditClick = (category, currentLimit) => {
    setEditingCategory(category);
    setTempBudget(currentLimit || '');
  };

  const handleSave = (category) => {
    const value = parseFloat(tempBudget);
    if (!isNaN(value) && value >= 0) {
      onUpdateBudget(category, value);
    }
    setEditingCategory(null);
  };

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex-between" style={{ marginBottom: '20px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          <Sliders size={20} color="var(--accent-primary)" />
          Presupuestos por Categoría
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mensual</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {categories.map((cat) => {
          const limit = budgets[cat.key] || 0;
          const spent = expensesByCategory[cat.key] || 0;
          const percent = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
          const isOverBudget = limit > 0 && spent > limit;
          const isNearingLimit = limit > 0 && spent > limit * 0.85 && spent <= limit;
          
          let barGradient = `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)`;
          if (isOverBudget) {
            barGradient = 'linear-gradient(90deg, var(--color-danger), #ff79c6)';
          } else if (isNearingLimit) {
            barGradient = 'linear-gradient(90deg, var(--color-warning), #ffb86c)';
          }

          return (
            <div key={cat.key} style={{ background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.02)' }}>
              <div className="flex-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{cat.emoji}</span>
                  {cat.label}
                </span>

                {editingCategory === cat.key ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>$</span>
                      <input 
                        type="number" 
                        value={tempBudget}
                        onChange={(e) => setTempBudget(e.target.value)}
                        placeholder="Monto"
                        autoFocus
                        style={{
                          background: 'rgba(0,0,0,0.5)',
                          border: '1px solid var(--accent-primary)',
                          borderRadius: '6px',
                          padding: '4px 8px 4px 18px',
                          color: '#fff',
                          width: '90px',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>
                    <button 
                      onClick={() => handleSave(cat.key)}
                      style={{ background: 'var(--accent-primary)', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => handleEditClick(cat.key, limit)}
                    style={{ cursor: 'pointer', color: limit > 0 ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Límite: </span>
                    <strong style={{ textDecoration: 'underline dotted var(--text-muted)' }}>
                      {limit > 0 ? `$${limit.toLocaleString('es-MX')}` : 'Sin definir'}
                    </strong>
                  </div>
                )}
              </div>

              {/* Progress and status */}
              {limit > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${percent}%`, 
                        background: barGradient,
                        boxShadow: isOverBudget ? '0 0 10px rgba(244,63,94,0.3)' : 'none'
                      }}
                    />
                  </div>
                  
                  <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span>Gastado: ${spent.toLocaleString('es-MX')} ({percent.toFixed(0)}%)</span>
                    <span>Restan: ${(limit - spent).toLocaleString('es-MX')}</span>
                  </div>

                  {isOverBudget && (
                    <div className="tag tag-danger" style={{ alignSelf: 'flex-start', marginTop: '4px', fontSize: '0.7rem' }}>
                      <AlertTriangle size={12} />
                      ¡Presupuesto Excedido por ${(spent - limit).toLocaleString('es-MX')}!
                    </div>
                  )}

                  {isNearingLimit && (
                    <div className="tag" style={{ alignSelf: 'flex-start', marginTop: '4px', fontSize: '0.7rem', background: 'var(--color-warning-bg)', color: 'var(--color-warning)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      <AlertTriangle size={12} />
                      ¡Estás cerca del límite! (Más del 85%)
                    </div>
                  )}
                </div>
              )}

              {limit === 0 && spent > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span style={{ height: '6px', width: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}></span>
                  Gastado sin presupuesto establecido: ${spent.toLocaleString('es-MX')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
