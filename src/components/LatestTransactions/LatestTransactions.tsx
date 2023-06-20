// components/LatestTransactions.tsx
import React from 'react';
import DataGrid, { Column, RenderCellProps } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { BLOCK_EXPLORER_BASE_URL } from 'src/constants';
import styles from '../styles/global.module.css';

import { LatestTransactionsProps } from '../types/LatestTransactionsProps';
import { ColumnDefinition } from '../types/ColumnDefinition';
import { TransactionRow } from '../types/TransactionRow';
import useLatestTransactions from '../../hooks/useLatestTransactions';
import usePaginationOffset from '../../hooks/usePaginationOffset';
import ErrorBoundary from './ErrorBoundary';
import QueryPagination from './QueryPagination';

const columnProps = [
  { key: 'hash', name: 'Hash', route: 'tx' },
  { key: 'method', name: 'Method' },
  { key: 'type', name: 'Type' },
  { key: 'block', name: 'Block' },
  { key: 'age', name: 'Age' },
  { key: 'from', name: 'From', route: 'address' },
  { key: 'to', name: 'To', route: 'address' },
  { key: 'value', name: 'Value' },
];

const generateColumnDefinitions = (theme, blockchain, colProps) => {
  return colProps.map(({ key, name, route }) => {
    let cellClass;
    let renderCell;

    if (key === 'method') {
      cellClass = (row: TransactionRow) =>
        styles[`${theme}-methodSpanClassname`];
    } else {
      cellClass = (row: TransactionRow) => styles[`${theme}-colSpanClassname`];
    }

    if (route) {
      renderCell = (rowProps: RenderCellProps<TransactionRow>) => {
        return (
          <a
            href={`${BLOCK_EXPLORER_BASE_URL[blockchain]}/${route}/${rowProps.row[key]}`}
            target="_blank"
            rel="noreferrer"
          >
            {rowProps.row[key]}
          </a>
        );
      };
    }

    const column: Column<TransactionRow> = {
      key,
      name,
      width: '12.5%',
      resizable: true,
      cellClass,
      renderCell,
      headerCellClass: styles[`${theme}-headerCell`],
    };

    return column;
  });
};

const LatestTransactions = ({
  contract_address,
  blockchain,
  api_key,
  api_server = 'https://api.sort.xyz',
  height = '600px',
  theme = 'dark',
  enableVirtualization = true,
}: LatestTransactionsProps) => {
  console.log(`Theme: ${theme}`);
  const { offset, increaseOffset, decreaseOffset } = usePaginationOffset();
  const { rows, errorMsg, loading, queryCount } = useLatestTransactions(
    contract_address,
    blockchain,
    offset,
    api_key,
    api_server,
  );

  const columns: ColumnDefinition[] = generateColumnDefinitions(
    theme,
    blockchain,
    columnProps,
  );

  return (
    <div className={`${styles['main-container']}`} data-testid="main-container">
      <ErrorBoundary>
        <QueryPagination
          theme={theme}
          offset={offset}
          total={queryCount}
          increaseOffset={increaseOffset}
          decreaseOffset={decreaseOffset}
        />
        <div style={{ width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            rowKeyGetter={(row: TransactionRow) => row.hash}
            enableVirtualization={enableVirtualization}
            style={{
              width: '100%',
              height,
              border: theme === 'dark' ? '0px solid white' : '0px solid black',
              backgroundColor: 'transparent',
            }}
            rowHeight={50}
          />
          {errorMsg && <div>{errorMsg}</div>}
        </div>
      </ErrorBoundary>
      <div>
        <nav className={`${styles[`${theme}-view-component`]}`}>
          <a
            href="https://docs.sort.xyz/docs/latest-transactions"
            target="_blank"
            rel="noreferrer"
          >
            &#60; view react component &#62;
          </a>
        </nav>
      </div>
    </div>
  );
};

export default LatestTransactions;
