import React, { useState } from 'react';
import Card from './Card';
import { ArrowUpRight, ArrowDownRight, Wallet, PieChart, BarChart2 } from 'lucide-react';

export default function Dashboard({ transactions, expensesByCategory }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Compute total balances
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;

  // Category list and styles
  const categories = [
    { key: 'Comida', label: 'Comida', color: 'var(--accent-primary)', emoji: '🍔' },
    { key: 'Transporte', label: 'Transporte', color: 'var(--accent-secondary)', emoji: '🚗' },
    { key: 'Hogar', label: 'Hogar', color: 'var(--color-warning)', emoji: '🏠' },
    { key: 'Entretenimiento', label: 'Ocio', color: '#ff79c6', emoji: '🎬' },
    { key: 'Compras', label: 'Compras', color: '#f1fa8c', emoji: '🛍' },
    { key: 'Otros', label: 'Otros', color: 'var(--text-muted)', emoji: '📦' }
  ];

  // Filter out categories with zero spending
  const activeCategories = categories
    .map(c => ({
      ...c,
      amount: expensesByCategory[c.key] || 0
    }))
    .filter(c => c.amount > 0);

  const totalCategoryExpenses = activeCategories.reduce((sum, c) => sum + c.amount, 0);

  // Donut chart calculations
  let accumulatedPercent = 0;
  const donutRadius = 70;
  const donutCircumference = 2 * Math.PI * donutRadius;

  const donutSegments = activeCategories.map((c) => {
    const percent = totalCategoryExpenses > 0 ? (c.amount / totalCategoryExpenses) : 0;
    const strokeLength = percent * donutCircumference;
    const strokeOffset = donutCircumference - strokeLength + (accumulatedPercent * donutCircumference);
    
    // Increment accumulated percentage for the next slice
    accumulatedPercent -= percent;

    return {
      ...c,
      percent: percent * 100,
      strokeLength,
      strokeOffset
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 3 Overview Balance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* Net Balance Card */}
        <Card glow className="animate-fade-in-up" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.6), rgba(139,92,246,0.1))' }}>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wallet size={16} color="var(--accent-primary)" />
              SALDO TOTAL DISPONIBLE
            </span>
          </div>
          <h2 style={{ fontSize: '2.1rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: totalBalance >= 0 ? '#fff' : 'var(--text-danger)' }}>
            ${totalBalance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Actualizado en tiempo real
          </p>
        </Card>

        {/* Total Inflow Card */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpRight size={16} color="var(--text-success)" />
              INGRESOS TOTALES
            </span>
            <span className="tag tag-success" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>Entradas</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-success)' }}>
            +${totalIncome.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            {transactions.filter(t => t.type === 'income').length} movimientos de ingreso
          </p>
        </Card>

        {/* Total Outflow Card */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowDownRight size={16} color="var(--text-danger)" />
              EGRESOS / GASTOS
            </span>
            <span className="tag tag-danger" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>Salidas</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-danger)' }}>
            -${totalExpense.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            {transactions.filter(t => t.type === 'expense').length} movimientos de gasto
          </p>
        </Card>
      </div>

      {/* Visual Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* Interactive Charts Panel */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex-between" style={{ marginBottom: '24px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              <PieChart size={20} color="var(--accent-primary)" />
              Distribución de Egresos
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Proporcional</span>
          </div>

          {totalCategoryExpenses === 0 ? (
            <div className="flex-center" style={{ flexDirection: 'column', gap: '12px', height: '240px', color: 'var(--text-muted)' }}>
              <BarChart2 size={40} style={{ opacity: 0.5 }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>No hay egresos registrados</p>
              <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>Registra algunos egresos en el formulario lateral para ver su distribución visual.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', mdDirection: 'row', gap: '24px', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              
              {/* SVG Donut Chart */}
              <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="100"
                    cy="100"
                    r={donutRadius}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.02)"
                    strokeWidth="16"
                  />
                  {donutSegments.map((segment) => {
                    const isHovered = hoveredCategory === segment.key;
                    return (
                      <circle
                        key={segment.key}
                        cx="100"
                        cy="100"
                        r={donutRadius}
                        fill="transparent"
                        stroke={segment.color}
                        strokeWidth={isHovered ? "22" : "16"}
                        strokeDasharray={donutCircumference}
                        strokeDashoffset={segment.strokeOffset}
                        strokeLinecap="round"
                        style={{
                          transition: 'stroke-width 0.3s ease, stroke-dashoffset 0.6s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={() => setHoveredCategory(segment.key)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      />
                    );
                  })}
                </svg>

                {/* Donut Center Display */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}>
                  {hoveredCategory ? (
                    (() => {
                      const hovered = donutSegments.find(s => s.key === hoveredCategory);
                      return (
                        <>
                          <span style={{ fontSize: '1.2rem' }}>{hovered.emoji}</span>
                          <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{hovered.label}</h4>
                          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                            {hovered.percent.toFixed(0)}%
                          </h3>
                        </>
                      );
                    })()
                  ) : (
                    <>
                      <h4 style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>EGRESOS</h4>
                      <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                        ${totalExpense.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                      </h3>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>100% Total</span>
                    </>
                  )}
                </div>
              </div>

              {/* Legends & Category list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '200px' }}>
                {donutSegments.map((segment) => {
                  const isHovered = hoveredCategory === segment.key;
                  return (
                    <div
                      key={segment.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
                        border: isHovered ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setHoveredCategory(segment.key)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: segment.color
                        }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                          {segment.emoji} {segment.label}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                          ${segment.amount.toLocaleString('es-MX')}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {segment.percent.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </Card>
      </div>

    </div>
  );
}
