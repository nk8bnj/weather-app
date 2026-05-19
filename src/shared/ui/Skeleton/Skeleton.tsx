import type { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
}

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  radius = '0.375rem',
  className,
}: SkeletonProps) => {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
  };

  return (
    <div className={`${styles.skeleton} ${className ?? ''}`} style={style} aria-hidden="true" />
  );
};
