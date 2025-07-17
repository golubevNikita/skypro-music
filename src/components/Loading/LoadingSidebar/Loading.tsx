import styles from './Loading.module.css';

export default function SidebarSkeletonLoading() {
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <div className={styles.sidebar__personalName}></div>
        <div className={styles.sidebar__icon}></div>
      </div>

      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}></div>
          <div className={styles.sidebar__item}></div>
          <div className={styles.sidebar__item}></div>
        </div>
      </div>
    </div>
  );
}
