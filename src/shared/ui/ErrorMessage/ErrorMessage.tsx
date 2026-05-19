import type { ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}

export const ErrorMessage = ({
  title = 'Something went wrong',
  children,
  action,
}: ErrorMessageProps) => {
  return (
    <div className={styles.container} role="alert">
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{children}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
