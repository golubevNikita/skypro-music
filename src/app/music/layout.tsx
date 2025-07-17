import { ReactNode } from 'react';
import { Suspense } from 'react';

import Main from '@/components/Main/Main';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import SidebarSkeletonLoading from '@/components/Loading/LoadingSidebar/Loading';
import Bar from '@/components/Bar/Bar';

import styles from './layout.module.css';

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Main />

          <Centerblock trackList={children} />

          <Suspense fallback={<SidebarSkeletonLoading />}>
            <Sidebar />
          </Suspense>
        </main>

        <Bar />

        <footer className="footer"></footer>
      </div>
    </div>
  );
}
