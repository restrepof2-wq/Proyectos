import React, { useState } from 'react';
import Card from './Card';
import { Search, Trash2, Filter, ArrowUpRight, ArrowDownRight, Calendar, Tag } from 'lucide-react';

export default function TransactionList({ transactions, onDeleteTransaction }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'expense', 'income'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'amount-desc', 'amount-asc'

  const categories = [
    { key: 'all', label: 'Todas las Categorías' },
    // Expenses
    { key: 'Comida', label: '🍔 Comida & Restaurantes' },
    { key: 'Transporte', label: '🚗 Transporte & Gasolina' },
    { key: 'Hogar', label: '🏠 Hogar, Rentas & Servicios' },
    { key: 'Entretenimiento', label: '🎬 Entretenimiento & Ocio' },
    { key: 'Compras', label: '🛍️ Compras & Ropa' },
    { key: 'Otros', label: 'Gastos Varios / Otros' },
    // Incomes
    { key: 'Sueldo', label: '💼 Sueldo / Nómina' },
    { key: 'Inversiones', label: '📈 Rendimientos & Inversiones' },
    { key: 'Negocios', label: '🏢 Ventas & Negocios' }
  ];

  // Category translations for display tags
  const catMetadata = {
    Comida: { emoji: '🍔', label: 'Comida', color: 'var(--accent-primary)', bg: 'rgba(139, 92, 246, 0.1)' },
    Transporte: { emoji: '🚗', label: 'Transporte', color: 'var(--accent-secondary)', bg: 'rgba(6, 182, 212, 0.1)' },
    Hogar: { emoji: '🏠', label: 'Hogar', color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
    Entretenimiento: { emoji: '🎬', label: 'Ocio', color: '#ff79c6', bg: 'rgba(255, 121, 198, 0.1)' },
    Compras: { emoji: '🛍️', label: 'Compras', color: '#f1fa8c', bg: 'rgba(241, 250, 140, 0.1)' },
    Otros: { emoji: '📦', label: 'Otros', color: 'var(--text-muted)', bg: 'rgba(255,255,255,0.05)' },
    Sueldo: { emoji: '💼', label: 'Sueldo', color: 'var(--text-success)', bg: 'var(--color-success-bg)' },
    Inversiones: { emoji: '📈', label: 'Inversiones', color: '#50fa7b', bg: 'rgba(80, 250, 123, 0.1)' },
    Negocios: { emoji: '🏢', label: 'Negocio', color: '#8be9fd', bg: 'rgba(139, 233, 253, 0.1)' }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter & Sort Logic
  const filteredTransactions = transactions
    .filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateStr).toLocaleDateString('es-MX', options);
  };

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex-between" style={{ marginBottom: '20px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          <Filter size={20} color="var(--accent-primary)" />
          Historial de Movimientos
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {filteredTransactions.length} de {transactions.length} transacciones
        </span>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por concepto o categoría..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ paddingLeft: '40px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
          {/* Type Filter */}
          <select
            className="form-input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <option value="all">Todos los flujos</option>
            <option value="expense">Solo Egresos</option>
            <option value="income">Solo Ingresos</option>
          </select>

          {/* Category Filter */}
          <select
            className="form-input"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            className="form-input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <option value="date-desc">Recientes primero</option>
            <option value="date-asc">Antiguos primero</option>
            <option value="amount-desc">Monto: Mayor a menor</option>
            <option value="amount-asc">Monto: Menor a mayor</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
        {filteredTransactions.length === 0 ? (
          <div className="flex-center" style={{ flexDirection: 'column', gap: '12px', padding: '40px 0', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '2.5rem' }}>🔍</span>
            <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>No se encontraron transacciones</p>
            <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>Intenta ajustar tus criterios de búsqueda o filtros.</span>
          </div>
        ) : (
          filteredTransactions.map((t) => {
            const meta = catMetadata[t.category] || { emoji: '💰', label: t.category, color: 'var(--text-primary)', bg: 'rgba(255,255,255,0.05)' };
            const isExpense = t.type === 'expense';

            return (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-glow)',
                  borderLeft: `4px solid ${isExpense ? 'var(--color-danger)' : 'var(--color-success)'}`,
                  transition: 'all var(--transition-fast)',
                  animation: 'fadeIn 0.3s ease-out'
                }}
                className="transaction-item"
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <div
                    className="flex-center"
                    style={{
                      height: '38px',
                      width: '38px',
                      borderRadius: '50%',
                      background: meta.bg,
                      color: meta.color,
                      fontSize: '1.2rem',
                      flexShrink: 0
                    }}
                  >
                    {isExpense ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.title}
                    </h4>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: meta.color, 
                        background: meta.bg, 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span>{meta.emoji}</span>
                        {meta.label}
                      </span>
                      
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Calendar size={10} />
                        {formatDate(t.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: isExpense ? 'var(--text-danger)' : 'var(--text-success)'
                    }}
                  >
                    {isExpense ? '-' : '+'}${t.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </span>

                  <button
                    onClick={() => onDeleteTransaction(t.id)}
                    style={{
                      color: 'var(--text-muted)',
                      padding: '6px',
                      borderRadius: '8px',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-danger)';
                      e.currentTarget.style.background = 'var(--color-danger-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'none';
                    }}
                    title="Eliminar transacción"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
