import React, { useState, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

export interface SQLQueryProps {
    /**
     * SQL Query string to execute
     */
    query: string;

    /**
     * sort.xyz API key
     */
    api_key: string;
  }

const SQLQuery = ({
    query,
    api_key
  }: SQLQueryProps) => {

    // Data rows in table
    const [rows, setRows] = React.useState<any[]>([]);

    // Date columns in table
    const [columns, setColumns] = React.useState<any[]>([]);

    // Query error message
    const [errorMsg, setErrorMsg] = React.useState<any>("no error");

    useEffect(() => {
        if (query && api_key) {
            executeQuery();
        }
    }, [query]);

    async function executeQuery(): Promise<void> {
        const response = await fetch('https://api.sort.xyz/v1/queries/run', {
            method: 'POST',
            headers: {
                'x-api-key': api_key as string,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "query": query
            }),
          })
        
        const {data, errors} = await response.json();
       
        // first, check for an error message
        if (data && data.error) {
            setErrorMsg(data.error);
        }
        else if (data && data.records && data.records.length > 0) {
            // set columns from first result
            var keys = Object.keys(data.records[0]);
            let columnsTemp = [];
            for (let i=0; i<keys.length; i++) {
                columnsTemp.push({ key: keys[i], name: keys[i] });
            }
            setColumns(columnsTemp);

            // set rows
            setRows(data.records);

            // reset error message
            setErrorMsg(null);
        }
    }

    return (
        <div>
            {errorMsg && 
                <div>Error: {errorMsg}</div>
            }
            {!errorMsg &&
                <DataGrid columns={columns} rows={rows} style={{height:"500px"}} />
            }
        </div>
    )

}

export default SQLQuery;