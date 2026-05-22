import React, { useState } from 'react';
import Card from './Card';
import { PlusCircle, ArrowUpRight, ArrowDownRight, Calendar, Tag, CreditCard } from 'lucide-react';

export default function TransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'expense' or 'income'
  const [category, setCategory] = useState('Comida');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const categories = {
    expense: [
      { key: 'Comida', label: '🍔 Comida & Restaurantes' },
      { key: 'Transporte', label: '🚗 Transporte & Gasolina' },
      { key: 'Hogar', label: '🏠 Hogar, Rentas & Servicios' },
      { key: 'Entretenimiento', label: '🎬 Entretenimiento & Ocio' },
      { key: 'Compras', label: '🛍️ Compras & Ropa' },
      { key: 'Otros', label: '📦 Gastos Varios & Otros' }
    ],
    income: [
      { key: 'Sueldo', label: '💼 Sueldo / Nómina' },
      { key: 'Inversiones', label: '📈 Rendimientos & Inversiones' },
      { key: 'Negocios', label: '🏢 Ventas & Negocios' },
      { key: 'Otros', label: '💰 Otros Ingresos' }
    ]
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    // Set first available category of that type
    setCategory(categories[newType][0].key);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Por favor, ingresa una descripción para la transacción.');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Por favor, ingresa un monto válido mayor que cero.');
      return;
    }

    onAddTransaction({
      id: Date.now().toString(),
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
      date: date || new Date().toISOString().split('T')[0]
    });

    // Reset fields, except date & type for convenience
    setTitle('');
    setAmount('');
  };

  return (
    <Card className="animate-fade-in-up">
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '24px' }}>
        <PlusCircle size={20} color="var(--accent-primary)" />
        Nueva Transacción
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Toggle Income / Expense */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: type === 'expense' ? '1px solid var(--color-danger)' : '1px solid var(--border-glow)',
              background: type === 'expense' ? 'var(--color-danger-bg)' : 'rgba(255,255,255,0.01)',
              color: type === 'expense' ? 'var(--text-danger)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: 600,
              transition: 'all var(--transition-normal)'
            }}
          >
            <ArrowDownRight size={16} />
            Gasto / Egreso
          </button>
          
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: type === 'income' ? '1px solid var(--color-success)' : '1px solid var(--border-glow)',
              background: type === 'income' ? 'var(--color-success-bg)' : 'rgba(255,255,255,0.01)',
              color: type === 'income' ? 'var(--text-success)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: 600,
              transition: 'all var(--transition-normal)'
            }}
          >
            <ArrowUpRight size={16} />
            Ingreso / Entrada
          </button>
        </div>

        {/* Inputs */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CreditCard size={14} />
            Descripción
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej. Súper Semanal, Netflix, Sueldo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              $ Monto (MXN)
            </label>
            <input
              type="number"
              step="any"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} />
              Fecha
            </label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tag size={14} />
            Categoría
          </label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
          >
            {categories[type].map((cat) => (
              <option key={cat.key} value={cat.key} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{ color: 'var(--text-danger)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ height: '6px', width: '6px', backgroundColor: 'var(--color-danger)', borderRadius: '50%' }} />
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ 
            width: '100%', 
            marginTop: '8px',
            background: type === 'expense' ? 'linear-gradient(135deg, var(--color-danger), #b91c1c)' : 'linear-gradient(135deg, var(--color-success), #047857)',
            boxShadow: type === 'expense' ? '0 4px 14px 0 rgba(244, 63, 94, 0.3)' : '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
          }}
        >
          Agregar {type === 'expense' ? 'Gasto' : 'Ingreso'}
        </button>
      </form>
    </Card>
  );
}
