import React from 'react';
import styles from '../styles/global.module.css';
import QueryPaginationArrow from './QueryPaginationArrow';

interface QueryPaginationArrowsProps {
  theme: string;
  offset: number;
  total: number;
  increaseOffset: () => void;
  decreaseOffset: () => void;
}

const QueryPaginationArrows = ({
  theme,
  offset,
  total,
  increaseOffset,
  decreaseOffset,
}: QueryPaginationArrowsProps) => {
  const isLeftActive = offset > 0;
  const isRightActive = offset + 25 < total;

  return (
    <div className={`${styles.pagination}`}>
      <nav aria-label="pagination" className={`${styles.container}`}>
        <ul className={`${styles.buttons}`}>
          <QueryPaginationArrow
            theme={theme}
            isActive={isLeftActive}
            onClick={decreaseOffset}
            direction="left"
          />
          <QueryPaginationArrow
            theme={theme}
            isActive={isRightActive}
            onClick={increaseOffset}
            direction="right"
          />
        </ul>
      </nav>
    </div>
  );
};

export default QueryPaginationArrows;
