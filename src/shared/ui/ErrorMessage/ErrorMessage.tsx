import type { ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  title = 'Something went wrong',
  children,
  action,
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className={styles.container} role="alert">
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{children}</p>
      {(action || onRetry) && (
        <div className={styles.action}>
          {action}
          {onRetry && (
            <button type="button" className={styles.retryButton} onClick={onRetry}>
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
};
