import React from 'react';

/**
 * A beautiful, reusable glassmorphic container with custom styles and animations.
 */
export default function Card({ 
  children, 
  className = '', 
  interactive = false, 
  glow = false,
  onClick,
  ...props 
}) {
  const baseClass = 'glass-panel';
  const interactiveClass = interactive ? 'glass-panel-interactive' : '';
  const glowClass = glow ? 'glow-pulse' : '';
  
  return (
    <div 
      className={`${baseClass} ${interactiveClass} ${glowClass} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      {children}
    </div>
  );
}
