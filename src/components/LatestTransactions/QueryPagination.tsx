// components/QueryPagination.tsx
import React from 'react';
import styles from '../styles/global.module.css';

import QueryPaginationArrows from './QueryPaginationArrows';
import QueryPaginationRange from './QueryPaginationRange';

interface QueryPaginationProps {
  theme: string;
  offset: number;
  total: number;
  increaseOffset: () => void;
  decreaseOffset: () => void;
}

const QueryPagination = ({
  offset,
  total,
  theme,
  increaseOffset,
  decreaseOffset,
}: QueryPaginationProps) => {
  return (
    <div className={`${styles.summary}`}>
      <QueryPaginationRange offset={offset} total={total} theme={theme} />
      <QueryPaginationArrows
        offset={offset}
        total={total}
        theme={theme}
        increaseOffset={increaseOffset}
        decreaseOffset={decreaseOffset}
      />
    </div>
  );
};

export default QueryPagination;
