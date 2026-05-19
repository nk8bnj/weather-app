import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Spinner = ({ size = 'md', label = 'Loading...' }: SpinnerProps) => {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[size]}`} />
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
};
