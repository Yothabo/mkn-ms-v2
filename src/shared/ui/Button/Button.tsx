import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = '', variant = 'primary', size = 'md', isLoading, fullWidth, children, ...props },
    ref
  ) => {
    const buttonClasses = [
      styles.btn,
      styles[`btn--${variant}`],
      styles[`btn--${size}`],
      isLoading && styles['btn--loading'],
      fullWidth && styles['btn--full'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button className={buttonClasses} ref={ref} disabled={isLoading || props.disabled} {...props}>
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
