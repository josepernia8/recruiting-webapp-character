import { SelectHTMLAttributes, forwardRef } from 'react';
import './Select.css';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  children,
  id,
  variant = 'primary',
  size = 'medium',
  label,
  className = '',
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="select-wrapper">
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`custom-select select-${variant} select-${size} ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
});

Select.displayName = 'Select';
