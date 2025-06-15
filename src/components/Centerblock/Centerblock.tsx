import classNames from 'classnames';

import Search from './Search/Search';
import Filter from '../Filter/Filter';
import Track from './Track/Track';

import { data } from '@/data';

import styles from './centerblock.module.css';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <Filter />
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {/* <div className={styles.playlist__blur_wrapper}>

          </div> */}
          {data.map((trackItem) => {
            return <Track key={trackItem._id} trackItem={trackItem} />;
          })}
        </div>
      </div>
    </div>
  );
}
