import Link from 'next/link';
import Image from 'next/image';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.notFound__block}>
            <h1 className={styles.notFound__title}>404</h1>
            <h2 className={styles.notFound__subTitle}>
              Страница не найдена
              <Image
                priority={true}
                className={styles.notFound__smile_image}
                src="/img/smile_crying.png"
                alt={'smile'}
                width={52}
                height={52}
              />
            </h2>

            <p className={styles.notFound__description}>
              Возможно, она была удалена
            </p>
            <p className={styles.notFound__description}>
              или перенесена на другой адрес
            </p>

            <Link className={styles.btn__onMain} href="/">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
