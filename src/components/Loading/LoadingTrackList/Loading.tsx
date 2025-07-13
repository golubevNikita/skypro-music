import styles from './Loading.module.css';

export default function TracksSkeletonLoading() {
  const tracksQuantity: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  return tracksQuantity.map((el) => {
    return (
      <div key={el} className={styles.playlist__item}>
        <div className={styles.playlist__track}>
          <div className={styles.track__title}>
            <div className={styles.track__titleImage}></div>

            <div className={styles.track__titleText}></div>
          </div>

          <div className={styles.track__author}></div>

          <div className={styles.track__album}></div>

          <div className={styles.track__time}></div>
        </div>
      </div>
    );
  });
}
