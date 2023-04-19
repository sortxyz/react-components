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
    const [errorMsg, setErrorMsg] = React.useState<any>(null);

    useEffect(() => {
        if (query && api_key) {
            executeQuery();
        }
    }, [query]);

    async function executeQuery(): Promise<void> {
        try {
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
            
            const full_response = await response.json();
            const data = full_response?.data;
            
            // first, check for an error message
            if (full_response && full_response.code && full_response.code == 400) {
                setErrorMsg(full_response.message);
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
                // escape JSON if found
                let rowsTemp = [] as any;
                for (let i=0; i<data.records.length; i++) {
                    let valuesTemp = {} as any;
                    var keys = Object.keys(data.records[i]);
                    for (let j=0; j<keys.length; j++) {

                        if (typeof data.records[i][keys[j]] === 'object') {
                            valuesTemp[keys[j]] = JSON.stringify(data.records[i][keys[j]], null, 2);
                        } else {
                            valuesTemp[keys[j]] = data.records[i][keys[j]];
                        }
                        
                    }
                    rowsTemp.push(valuesTemp);
                }
                setRows(rowsTemp);

                // reset error message
                setErrorMsg(null);
            }
            else if (data && data.records && data.records.length == 0) {
                setErrorMsg("0 results");
            }
        } catch (e) {
            console.log(e);
        }
        
    }

    return (
        <div>
            {errorMsg && 
                <div style={{textAlign:"center", margin: "20px", fontSize: "18px", color: "red"}}>{errorMsg}</div>
            }
            {!errorMsg &&
                <DataGrid columns={columns} rows={rows} style={{height:"500px"}} />
            }
        </div>
    )

}

export default SQLQuery;