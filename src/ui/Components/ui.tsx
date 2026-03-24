import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
}) => {
  const baseClasses = 'glass-button font-semibold px-6 py-3 rounded-lg transition-all duration-200'
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-500/70 hover:bg-blue-600/70'
      : 'bg-white/10 hover:bg-white/20'

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </button>
  )
}

interface PanelProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export const Panel: React.FC<PanelProps> = ({ children, className = '', title = '' }) => {
  return (
    <div
      className={`glass-panel ${className}`}
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {title && <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>}
      {children}
    </div>
  )
}
