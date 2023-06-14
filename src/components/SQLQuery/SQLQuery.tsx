import React, { useState, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import styles from '../styles/global.module.css';

export interface SQLQueryProps {
  /**
   * SQL Query string to execute
   */
  query: string;

  /**
   * sort.xyz API key
   */
  api_key: string;

  /**
   * sort.xyz API key
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
}

const SQLQuery = ({
  query,
  api_key,
  api_server = 'https://api.sort.xyz',
  height = '600px',
  theme = 'dark',
}: SQLQueryProps) => {
  // Data rows in table
  const [rows, setRows] = React.useState<any[]>([]);

  // Date columns in table
  const [columns, setColumns] = React.useState<any[]>([]);

  // Query error message
  const [errorMsg, setErrorMsg] = React.useState<any>(null);

  async function executeQuery(): Promise<void> {
    try {
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
        // set columns from first result
        const keys = Object.keys(data.records[0]);
        const columnsTemp = [];
        for (let i = 0; i < keys.length; i++) {
          columnsTemp.push({
            key: keys[i],
            name: keys[i],
            headerCellClass: styles[`${theme}-headerCell`],
            cellClass: styles[`${theme}-colSpanClassname`],
          });
        }
        setColumns(columnsTemp);

        // set rows
        // escape JSON if found
        const rowsTemp = [] as any;
        let keys2;
        for (let i = 0; i < data.records.length; i++) {
          const valuesTemp = {} as any;
          keys2 = Object.keys(data.records[i]);
          for (let j = 0; j < keys2.length; j++) {
            if (typeof data.records[i][keys2[j]] === 'object') {
              valuesTemp[keys2[j]] = JSON.stringify(
                data.records[i][keys2[j]],
                null,
                2,
              );
            } else {
              valuesTemp[keys2[j]] = data.records[i][keys2[j]];
            }
          }
          rowsTemp.push(valuesTemp);
        }
        setRows(rowsTemp);

        // reset error message
        setErrorMsg(null);
      } else if (data && data.records && data.records.length === 0) {
        setErrorMsg('0 results');
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (query && api_key) {
      executeQuery();
    }
  }, [query]);

  return (
    <div>
      {errorMsg && (
        <div
          style={{
            textAlign: 'center',
            margin: '20px',
            fontSize: '18px',
            color: 'red',
          }}
        >
          {errorMsg}
        </div>
      )}
      {!errorMsg && (
        <DataGrid
          columns={columns}
          rows={rows}
          rowHeight={50}
          style={{
            width: '100%',
            height,
            border: theme === 'dark' ? '0px solid white' : '0px solid black',
            backgroundColor: 'transparent',
          }}
        />
      )}

      <div>
        <nav className={`${styles[`${theme}-view-component`]}`}>
          <a
            href="https://docs.sort.xyz/docs/sql-query"
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

export default SQLQuery;
