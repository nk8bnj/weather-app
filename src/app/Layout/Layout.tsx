import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weather</h1>
      </header>

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
