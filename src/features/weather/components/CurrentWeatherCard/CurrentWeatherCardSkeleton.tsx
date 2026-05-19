import { Skeleton } from '@/shared/ui';
import styles from './CurrentWeatherCard.module.scss';

export const CurrentWeatherCardSkeleton = () => {
  return (
    <article className={styles.card} aria-busy="true">
      <header className={styles.header}>
        <Skeleton width="60%" height="1.75rem" />
        <Skeleton width="40%" height="1rem" />
      </header>

      <div className={styles.main}>
        <Skeleton width={96} height={96} radius="50%" />
        <Skeleton width={140} height="3.5rem" />
      </div>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <Skeleton width="60%" height="0.8125rem" />
          <Skeleton width="40%" height="1.125rem" />
        </div>
        <div className={styles.stat}>
          <Skeleton width="60%" height="0.8125rem" />
          <Skeleton width="40%" height="1.125rem" />
        </div>
        <div className={styles.stat}>
          <Skeleton width="60%" height="0.8125rem" />
          <Skeleton width="40%" height="1.125rem" />
        </div>
      </dl>
    </article>
  );
};
