import styles from './FavoriteToggleButton.module.scss';

interface FavoriteToggleButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteToggleButton = ({ isFavorite, onToggle }: FavoriteToggleButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${isFavorite ? styles.active : ''}`}
      onClick={onToggle}
      aria-pressed={isFavorite}
    >
      {isFavorite ? '★ In favorites' : '☆ Add to favorites'}
    </button>
  );
};
