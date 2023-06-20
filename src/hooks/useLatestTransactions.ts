import { useState, useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { TransactionRow } from '../components/types/TransactionRow';
import { DEFAULT_API_SERVER, BLOCKCHAIN_CURRENCY } from '../constants/index';

TimeAgo.addDefaultLocale(en);

const useLatestTransactions = (
  contract_address: string,
  blockchain: string,
  offset: number,
  api_key: string,
  api_server: string = DEFAULT_API_SERVER,
): {
  rows: TransactionRow[];
  errorMsg: string;
  loading: boolean;
  queryCount: number;
} => {
  const [rows, setRows] = useState<TransactionRow[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [queryCount, setQueryCount] = useState<number>(0);

  // Function to execute count query
  const executeCountQuery = async () => {
    const query = `select count(*) from ${blockchain}.transaction t where t.to_address = '${contract_address.toLowerCase()}'`;
    const response = await fetch(`${api_server}/v1/queries/run`, {
      method: 'POST',
      headers: {
        'x-api-key': api_key as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseJSON = await response.json();
    const data = responseJSON?.data;

    // First, check for an error message
    if (responseJSON && responseJSON.code && responseJSON.code === 400) {
      return { error: responseJSON.message };
    }

    if (data && data.records && data.records.length > 0) {
      const row = data.records[0];
      return { count: parseInt(row.count, 10) };
    }

    return { error: '0 results' };
  };

  // Function to execute rows query
  const executeRowsQuery = async () => {
    const query = `select transaction_hash as hash, function as method, b.block_number, b.timestamp, t.from_address, t.to_address, t.value / 1e18 as value from ${blockchain}.transaction t, ${blockchain}.block b where to_address = '${contract_address.toLowerCase()}' and t.block_id = b.id order by b.block_number desc limit 25 offset ${offset}`;
    const response = await fetch(`${api_server}/v1/queries/run`, {
      method: 'POST',
      headers: {
        'x-api-key': api_key as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseJSON = await response.json();
    const data = responseJSON?.data;

    if (responseJSON && responseJSON.code && responseJSON.code === 400) {
      return { error: responseJSON.message };
    }

    if (data && data.records && data.records.length > 0) {
      const rowsTemp = data.records.map((data_row) => {
        const timeAgo = new TimeAgo('en-US');
        const time_ago = timeAgo.format(new Date(data_row.timestamp));

        return {
          hash: data_row.hash,
          method: data_row.method,
          type: 'Transaction',
          block: data_row.block_number,
          age: time_ago,
          from: data_row.from_address,
          to: data_row.to_address,
          value: `${data_row.value} ${BLOCKCHAIN_CURRENCY[blockchain]}`,
        };
      });
      return { rows: rowsTemp };
    }
    return { error: '0 results' };
  };

  // Fetches data initially and whenever offset changes
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // Execute the count
        const countResponse = await executeCountQuery();

        if (countResponse.error) {
          setErrorMsg(countResponse.error);
        } else {
          setQueryCount(countResponse.count);
        }

        // Execute the query for rows
        const rowsResponse = await executeRowsQuery();

        if (rowsResponse.error) {
          setErrorMsg(rowsResponse.error);
        } else {
          setRows(rowsResponse.rows);
        }
      } catch (err) {
        setErrorMsg(`Error fetching transactions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [offset]);

  return { rows, errorMsg, loading, queryCount };
};

export default useLatestTransactions;
