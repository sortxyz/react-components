import React from 'react';
import styles from '../styles/global.module.css';
import QueryPaginationArrow from './QueryPaginationArrow';

interface QueryPaginationArrowsProps {
  theme: string;
  offset: number;
  total: number;
  loading: boolean;
  increaseOffset: () => void;
  decreaseOffset: () => void;
}

const QueryPaginationArrows = ({
  theme,
  offset,
  total,
  loading,
  increaseOffset,
  decreaseOffset,
}: QueryPaginationArrowsProps) => {
  const isLeftActive = !loading && offset > 0;
  const isRightActive = !loading && offset + 25 < total;

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
