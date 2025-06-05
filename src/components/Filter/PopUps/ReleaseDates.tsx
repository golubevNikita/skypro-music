'use client';
import classNames from 'classnames';

import { releaseDatesFilters } from '@/services/utilities';

import styles from '../popUps.module.css';

interface ReleaseDatesProps {
  activeFilterItem: string;
  chooseActiveElement: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

export default function ReleaseDates({
  activeFilterItem,
  chooseActiveElement,
}: ReleaseDatesProps) {
  return (
    <div className={styles.releaseDates__wrapper}>
      <div className={styles.releaseDates__container}>
        {releaseDatesFilters.map((filterItem, index) => {
          return (
            <p
              key={index}
              className={classNames(styles.releaseDates__filterItem, {
                [styles.releaseDates__filterItem_active]:
                  activeFilterItem === filterItem,
              })}
              onClick={(event) => {
                chooseActiveElement(event);
              }}
            >
              {filterItem}
            </p>
          );
        })}
      </div>
    </div>
  );
}
