import { ReactNode } from 'react';
import Image from 'next/image';

import styles from './layout.module.css';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form}>
              <Image
                className={styles.modal__logo}
                src="/img/logo_modal.png"
                alt="logo"
                width={140}
                height={21}
              />

              {children}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
