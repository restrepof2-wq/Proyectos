import React from 'react';
import Card from './Card';
import { Sparkles, TrendingUp, TrendingDown, HelpCircle, Lightbulb } from 'lucide-react';

export default function FinancialInsights({ transactions, budgets }) {
  const computeInsights = () => {
    const insights = [];
    
    // Total income and expenses
    let totalIncome = 0;
    let totalExpense = 0;
    
    // Category expenses
    const categorySpent = {};
    
    transactions.forEach((t) => {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
        categorySpent[t.category] = (categorySpent[t.category] || 0) + t.amount;
      }
    });

    if (transactions.length === 0) {
      return [
        {
          type: 'neutral',
          icon: <HelpCircle size={18} color="var(--accent-secondary)" />,
          title: 'Comienza tu viaje financiero',
          text: 'Agrega tus primeros ingresos y gastos para que nuestro análisis de Inteligencia Financiera empiece a darte consejos personalizados en tiempo real.'
        }
      ];
    }

    // Insight 1: Saving Rate
    if (totalIncome > 0) {
      const expenseRate = (totalExpense / totalIncome) * 100;
      const savingRate = 100 - expenseRate;

      if (expenseRate > 90) {
        insights.push({
          type: 'danger',
          icon: <TrendingDown size={18} color="var(--text-danger)" />,
          title: 'Tasa de ahorro crítica',
          text: `Estás gastando el ${expenseRate.toFixed(0)}% de tus ingresos. Te queda muy poco margen de ahorro (${savingRate.toFixed(0)}%). Considera recortar gastos no esenciales.`
        });
      } else if (expenseRate > 70) {
        insights.push({
          type: 'warning',
          icon: <Lightbulb size={18} color="var(--color-warning)" />,
          title: 'Tasa de ahorro moderada',
          text: `Estás destinando el ${expenseRate.toFixed(0)}% de tus ingresos a egresos. Aunque estás en verde, la regla estándar recomienda intentar ahorrar al menos un 20% (${savingRate.toFixed(0)}% actual).`
        });
      } else {
        insights.push({
          type: 'success',
          icon: <TrendingUp size={18} color="var(--text-success)" />,
          title: '¡Excelente ritmo de ahorro!',
          text: `¡Felicidades! Estás ahorrando un asombroso ${savingRate.toFixed(0)}% de tus ingresos. Este ritmo acelerará significativamente la creación de tu fondo de emergencia.`
        });
      }
    } else if (totalExpense > 0) {
      insights.push({
        type: 'warning',
        icon: <HelpCircle size={18} color="var(--color-warning)" />,
        title: 'Registra tus ingresos',
        text: 'Hemos detectado gastos pero aún no has ingresado ningún sueldo o entrada. Agrega ingresos para calcular tu tasa de ahorro.'
      });
    }

    // Insight 2: Category Concentration (gastando mucho en una sola cosa)
    if (totalExpense > 0) {
      Object.keys(categorySpent).forEach((category) => {
        const spent = categorySpent[category];
        const share = (spent / totalExpense) * 100;
        
        if (share > 40 && category !== 'Otros') {
          const categoryEmoji = {
            Comida: '🍔',
            Transporte: '🚗',
            Hogar: '🏠',
            Entretenimiento: '🎬',
            Compras: '🛍️'
          }[category] || '💰';

          insights.push({
            type: 'warning',
            icon: <Lightbulb size={18} color="var(--color-warning)" />,
            title: `Concentración alta en ${category}`,
            text: `El gasto en ${categoryEmoji} ${category} representa el ${share.toFixed(0)}% de tus egresos totales. Analiza si hay microgastos innecesarios en esta área.`
          });
        }
      });
    }

    // Insight 3: Standard 50/30/20 Rule advice
    insights.push({
      type: 'neutral',
      icon: <Sparkles size={18} color="var(--accent-primary)" />,
      title: 'Regla Financiera 50/30/20',
      text: 'Divide tus ingresos en: 50% para Necesidades (renta, servicios, súper), 30% para Deseos (salidas, entretenimiento) y 20% para Ahorro o pagar deudas.'
    });

    return insights;
  };

  const insightsList = computeInsights();

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '0.3s', position: 'relative', overflow: 'hidden' }}>
      {/* Background glass shine */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(139, 92, 246, 0.08)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
        <Sparkles size={20} color="var(--accent-primary)" />
        Consejos Inteligentes IA
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insightsList.map((ins, index) => {
          let borderLeftColor = 'var(--border-glow)';
          let bg = 'rgba(255, 255, 255, 0.01)';
          
          if (ins.type === 'success') {
            borderLeftColor = 'var(--color-success)';
            bg = 'rgba(16, 185, 129, 0.03)';
          } else if (ins.type === 'danger') {
            borderLeftColor = 'var(--color-danger)';
            bg = 'rgba(244, 63, 94, 0.03)';
          } else if (ins.type === 'warning') {
            borderLeftColor = 'var(--color-warning)';
            bg = 'rgba(245, 158, 11, 0.03)';
          } else if (ins.type === 'neutral') {
            borderLeftColor = 'var(--accent-primary)';
            bg = 'rgba(139, 92, 246, 0.02)';
          }

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glow)',
                borderLeft: `3px solid ${borderLeftColor}`,
                background: bg
              }}
            >
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {ins.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                  {ins.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {ins.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
