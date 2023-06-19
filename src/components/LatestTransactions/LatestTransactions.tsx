import React, { useEffect, useState } from 'react';

import DataGrid, { Column, RenderCellProps, Row } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import styles from '../styles/global.module.css';

TimeAgo.addDefaultLocale(en);

export interface LatestTransactionsProps {
  /**
   * Contract address
   */
  contract_address: string;

  /**
   * Blockchain network
   */
  blockchain: string;

  /**
   * sort.xyz API key
   */
  api_key: string;

  /**
   * sort.xyz API server
   */
  api_server?: string;

  /**
   * Height of result grid, default to 600px
   */
  height?: string;

  /**
   * CSS theme, light or dark, default to dark
   */
  theme?: string;

  /**
   * Toggle on/off virtualization in DataGrid component (from react-data-grid)
   */
  enableVirtualization?: boolean;
}

type TransactionRow = {
  hash: string;
  method: string;
  type: string;
  block: number;
  age: string;
  from: string;
  to: string;
  value: string;
};

const blockchainCurrency: Record<string, string> = {
  ethereum: 'ETH',
  polygon: 'MATIC',
  goerli: 'GETH',
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
  const blockExplorerBaseURL = {
    ethereum: 'https://etherscan.io',
    goerli: 'https://goerli.etherscan.io',
    polygon: 'https://polygonscan.com',
  };

  const columns_val: Column<TransactionRow>[] = [
    {
      key: 'hash',
      name: 'Hash',
      width: '12.5%',
      resizable: true,
      renderCell: (props: RenderCellProps<TransactionRow>) => {
        return (
          <a
            href={`${blockExplorerBaseURL[blockchain]}/tx/${props.row.hash}`}
            target="_blank"
            rel="noreferrer"
          >
            {props.row.hash}
          </a>
        );
      },
      cellClass: (row: TransactionRow) => styles[`${theme}-colSpanClassname`],
      headerCellClass: styles[`${theme}-headerCell`],
    },
    {
      key: 'method',
      name: 'Method',
      width: '12.5%',
      resizable: true,
      cellClass: (row: TransactionRow) =>
        styles[`${theme}-methodSpanClassname`],

      headerCellClass: styles[`${theme}-headerCell`],
    },
    {
      key: 'type',
      name: 'Type',
      width: '12.5%',
      resizable: true,
      cellClass: (row: TransactionRow) => styles[`${theme}-colSpanClassname`],
      headerCellClass: styles[`${theme}-headerCell`],
    },
    {
      key: 'block',
      name: 'Block',
      width: '12.5%',
      resizable: true,
      cellClass: (row: TransactionRow) => styles[`${theme}-colSpanClassname`],
      headerCellClass: styles[`${theme}-headerCell`],
    },
    {
      key: 'age',
      name: 'Age',
      width: '12.5%',
      resizable: true,
      cellClass: (row: TransactionRow) => styles[`${theme}-colSpanClassname`],
      headerCellClass: styles[`${theme}-headerCell`],
    },
    {
      key: 'from',
      name: 'From',
      width: '12.5%',
      resizable: true,
      renderCell: (props: RenderCellProps<TransactionRow>) => {
        return (
          <a
            href={`${blockExplorerBaseURL[blockchain]}/address/${props.row.from}`}
            target="_blank"
            rel="noreferrer"
          >
            {props.row.from}
          </a>
        );
      },
      cellClass: (row: TransactionRow) => styles[`${theme}-colSpanClassname`],
      headerCellClass: styles[`${theme}-headerCell`],
    },
    {
      key: 'to',
      name: 'To',
      width: '12.5%',
      resizable: true,
      renderCell: (props: RenderCellProps<TransactionRow>) => {
        return (
          <a
            href={`${blockExplorerBaseURL[blockchain]}/address/${props.row.to}`}
            target="_blank"
            rel="noreferrer"
          >
            {props.row.to}
          </a>
        );
      },
      cellClass: (row: TransactionRow) => styles[`${theme}-colSpanClassname`],
      headerCellClass: styles[`${theme}-headerCell`],
    },
    {
      key: 'value',
      name: 'Value',
      width: '12.5%',
      resizable: true,
      cellClass: (row: TransactionRow) => styles[`${theme}-colSpanClassname`],
      headerCellClass: styles[`${theme}-headerCell`],
    },
  ];

  // Table rows to display
  const [rows, setRows] = useState<TransactionRow[]>([]);

  // Date columns in table
  const [columns, setColumns] = useState<Column<TransactionRow>[]>([]);

  // Query error message
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  // loadingSql
  const [loadingSql, setLoadingSql] = React.useState<boolean>(false);

  // Query offset (TODO: replace with range based pagination)
  const [offset, setOffset] = React.useState<number>(0);

  // Query offset (TODO: replace with range based pagination)
  const [queryCount, setQueryCount] = React.useState<number>(0);

  async function executeCount(): Promise<void> {
    try {
      setLoadingSql(true);
      const query = `select count(*) from ${blockchain}.transaction t where t.to_address = '${contract_address.toLowerCase()}'`;
      const response = await fetch(`${api_server}/v1/queries/run`, {
        method: 'POST',
        headers: {
          'x-api-key': api_key as string,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      });

      const full_response = await response.json();
      const data = full_response?.data;

      // first, check for an error message
      if (full_response && full_response.code && full_response.code === 400) {
        setErrorMsg(full_response.message);
      } else if (data && data.records && data.records.length > 0) {
        const row = data.records[0];
        setQueryCount(parseInt(row.count, 10));
      } else if (data && data.records && data.records.length === 0) {
        setErrorMsg('0 results');
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function executeQuery(): Promise<void> {
    try {
      setLoadingSql(true);
      const query = `select transaction_hash as hash, function as method, b.block_number, b.timestamp, t.from_address, t.to_address, t.value / 1e18 as value from ${blockchain}.transaction t, ${blockchain}.block b where to_address = '${contract_address.toLowerCase()}' and t.block_id = b.id order by b.block_number desc limit 25 offset ${offset}`;

      const response = await fetch(`${api_server}/v1/queries/run`, {
        method: 'POST',
        headers: {
          'x-api-key': api_key as string,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      });

      const full_response = await response.json();
      const data = full_response?.data;

      // first, check for an error message
      if (full_response && full_response.code && full_response.code === 400) {
        setErrorMsg(full_response.message);
      } else if (data && data.records && data.records.length > 0) {
        // set rows
        // escape JSON if found
        const rowsTemp = [];
        for (let i = 0; i < data.records.length; i++) {
          const data_row = data.records[i];

          const timeAgo = new TimeAgo('en-US');
          const time_ago = timeAgo.format(new Date(data_row.timestamp));

          const row = {
            hash: data_row.hash,
            method: data_row.method,
            type: 'Transaction',
            block: data_row.block_number,
            age: time_ago,
            from: data_row.from_address,
            to: data_row.to_address,
            value: `${data_row.value} ${blockchainCurrency[blockchain]}`,
          };
          rowsTemp.push(row);
        }
        setRows(rowsTemp);

        // reset error message
        setErrorMsg('');
        setLoadingSql(false);
      } else if (data && data.records && data.records.length === 0) {
        setErrorMsg('0 results');
        setLoadingSql(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const increaseOffset = () => {
    if (!loadingSql) {
      setOffset(offset + 25);
      executeQuery();
    }
  };

  const decreaseOffset = () => {
    if (offset - 25 >= 0 && !loadingSql) {
      setOffset(offset - 25);
      executeQuery();
    }
  };

  const generateRangeText = () => {
    let range: string;

    if (offset === 0) {
      range = `${queryCount <= 25 ? queryCount : 25}`;
    } else {
      const start = offset + 1;
      const end = Math.min(offset + 25, queryCount);
      range = queryCount <= 25 ? `${queryCount}` : `${start}-${end}`;
    }

    return `${range} transactions`;
  };

  useEffect(() => {
    executeQuery();
    executeCount();
  }, []);

  return (
    <>
      {loadingSql && (
        <div
          className={`${styles['main-container']}`}
          data-testid="main-container"
        >
          <div className={`${styles.summary}`}>
            <div className={`${styles[`${theme}-summary-text`]}`}>
              <div
                className={`${styles.skeleton} ${styles['skeleton-text']} ${styles['skeleton-text__body']}`}
                data-testid="skeleton"
              />
            </div>
            <div className={`${styles.pagination}`}>
              <nav aria-label="pagination" className={`${styles.container}`}>
                <ul className={`${styles.buttons}`}>
                  <li
                    onClick={() => decreaseOffset()}
                    className={`${styles[`${theme}-left`]}`}
                    data-testid="left-arrow"
                  >
                    <span aria-hidden="true">&#x2039;</span>
                  </li>
                  <li
                    onClick={() => increaseOffset()}
                    className={`${styles[`${theme}-right`]}`}
                    data-testid="right-arrow"
                  >
                    <span aria-hidden="true">&#x203A;</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <DataGrid
              enableVirtualization={enableVirtualization}
              columns={columns_val}
              rows={rows}
              style={{
                width: '100%',
                height,
                border: '0px solid white',
                backgroundColor: 'transparent',
              }}
              rowHeight={50}
            />
          </div>
          <div>
            <div>
              <nav className={`${styles['view-component']}`}>
                <a
                  href="https://docs.sort.xyz/docs/getting-started"
                  target="_blank"
                  rel="noreferrer"
                >
                  &#60; view react component &#62;
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
      {!loadingSql && (
        <div
          className={`${styles['main-container']}`}
          data-testid="main-container"
        >
          <div className={`${styles.summary}`}>
            <div className={`${styles[`${theme}-summary-text`]}`}>
              {queryCount <= 25 && (
                <span className={`${styles[`${theme}-summary-number`]}`}>
                  Latest transactions
                </span>
              )}

              {queryCount > 25 && (
                <>
                  Latest{' '}
                  <span className={`${styles[`${theme}-summary-number`]}`}>
                    {generateRangeText()}
                  </span>{' '}
                  from a total of{' '}
                  <span className={`${styles[`${theme}-summary-number`]}`}>
                    {queryCount}
                  </span>{' '}
                  transactions
                </>
              )}
            </div>

            <div className={`${styles.pagination}`}>
              <nav aria-label="pagination" className={`${styles.container}`}>
                <ul className={`${styles.buttons}`}>
                  {offset > 0 && (
                    <li
                      onClick={() => decreaseOffset()}
                      className={`${styles[`${theme}-left`]}`}
                      data-testid="left-arrow"
                    >
                      <span aria-hidden="true">&#x2039;</span>
                    </li>
                  )}
                  {offset === 0 && (
                    <li
                      className={`${styles[`${theme}-left-grey`]}`}
                      data-testid="left-arrow"
                    >
                      <span aria-hidden="true">&#x2039;</span>
                    </li>
                  )}

                  {offset + 25 < queryCount && (
                    <li
                      onClick={() => increaseOffset()}
                      className={`${styles[`${theme}-right`]}`}
                      data-testid="right-arrow"
                    >
                      <span aria-hidden="true">&#x203A;</span>
                    </li>
                  )}
                  {offset + 25 >= queryCount && (
                    <li
                      className={`${styles[`${theme}-right-grey`]}`}
                      data-testid="right-arrow"
                    >
                      <span aria-hidden="true">&#x203A;</span>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
          <br />
          <div style={{ width: '100%' }}>
            {errorMsg !== '' && (
              <div className={`${styles[`${theme}-no-results`]}`}>
                0 transactions
              </div>
            )}
            {errorMsg === '' && (
              <DataGrid
                enableVirtualization={enableVirtualization}
                columns={columns_val}
                rows={rows}
                style={{
                  width: '100%',
                  height,
                  border:
                    theme === 'dark' ? '0px solid white' : '0px solid black',
                  backgroundColor: 'transparent',
                }}
                rowHeight={50}
              />
            )}
          </div>
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
      )}
    </>
  );
};

export default LatestTransactions;
