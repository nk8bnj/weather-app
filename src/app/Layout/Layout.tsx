import { CitySearch } from '@/features/city-search';
import type { CityLocation } from '@/features/city-search';
import styles from './Layout.module.scss';

export const Layout = () => {
  const handleCitySelect = (city: CityLocation) => {
    // Selection handling will be implemented in a later commit.
    // For now, just log it so we can verify the autocomplete works.
    console.log('Selected city:', city);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weather</h1>
      </header>

      <div className={styles.search}>
        <CitySearch onSelect={handleCitySelect} />
      </div>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Favorites</h2>
          <p className={styles.placeholder}>No favorites yet.</p>
        </aside>

        <main className={styles.main}>
          <p className={styles.placeholder}>Use the search above to find weather for any city.</p>
        </main>
      </div>
    </div>
  );
};
