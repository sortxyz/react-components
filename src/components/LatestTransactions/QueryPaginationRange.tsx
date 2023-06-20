import React from 'react';
import styles from '../styles/global.module.css';

interface QueryPaginationRangeProps {
  theme: string;
  offset: number;
  total: number;
}

const generateRangeText = (offset, total) => {
  if (total === 0) {
    return '0';
  }

  const start = offset + 1;
  const end = Math.min(offset + 25, total);
  return `${start}-${end}`;
};

const QueryPaginationRange = ({
  theme,
  offset,
  total,
}: QueryPaginationRangeProps) => {
  const rangeText = generateRangeText(offset, total);

  return total === 0 ? (
    <div className={`${styles[`${theme}-summary-text`]}`}>0 transactions</div>
  ) : (
    <div className={`${styles[`${theme}-summary-text`]}`}>
      Latest{' '}
      <span className={`${styles[`${theme}-summary-number`]}`}>
        {rangeText}
      </span>{' '}
      of <span className={`${styles[`${theme}-summary-number`]}`}>{total}</span>{' '}
      transactions
    </div>
  );
};

export default QueryPaginationRange;
