// components/QueryPagination.tsx
import React from 'react';
import styles from '../styles/global.module.css';

interface QueryPaginationRangeProps {
  theme: string;
  offset: number;
  total: number;
}

const generateRangeText = (offset, total) => {
  let range: string;

  if (offset === 0) {
    range = `${total <= 25 ? total : 25}`;
  } else {
    const start = offset + 1;
    const end = Math.min(offset + 25, total);
    range = total <= 25 ? `${total}` : `${start}-${end}`;
  }

  return `${range}`;
};

const QueryPaginationRange = ({
  theme,
  offset,
  total,
}: QueryPaginationRangeProps) => {
  const rangeText = generateRangeText(offset, total);

  return (
    <div className={`${styles[`${theme}-summary-text`]}`}>
      Latest{' '}
      <span className={`${styles[`${theme}-summary-number`]}`}>
        {rangeText}
      </span>{' '}
      of <span className={`${styles[`${theme}-summary-number`]}`}>{total}</span>{' '}
      transactions
    </div>
  );
  // }
};

export default QueryPaginationRange;
