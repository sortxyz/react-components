import React, { useState, useEffect } from 'react';
import DataGrid from 'react-data-grid';
const Pusher = require('pusher-js');
import 'react-data-grid/lib/styles.css';

export interface PushNotificationsProps {
    /**
     * Contract address to look for notifications
     */
    contract_address: string;

    /**
     * Function name for filtering
     */
    function_name: string;

    /**
     * Number of results to display, default to 10
     */
    num: number;
}

const PushNotifications = ({
    contract_address, 
    num=10, 
    function_name=""
  }: PushNotificationsProps) => {

    // Data rows in table
    const [rows, setRows] = React.useState<any[]>([]);

    // Date columns in table
    const [columns, setColumns] = React.useState<any[]>([]);

    useEffect(() => {
        // Set table columns
        setColumns([
            {key:"date", name: "date"},
            {key:"hash", name: "hash"},
            {key:"from", name: "from"},
            {key:"function", name: "function"}
        ]);

        var pusher = new Pusher('ac91a1d4157ccb9e4203', {
            cluster: 'us2'
        })
    
        // Ethereum channels
        var ethereum_txn_channel = pusher.subscribe('ethereum-transactions')
        ethereum_txn_channel.bind('new', function (data:any) {
            if (contract_address && data.to === contract_address) {
                let date_obj = new Date(data.timestamp)
                data.timestamp_obj = date_obj
                
                let row = {
                    "date" : date_obj.toISOString().slice(0, 16),
                    "function" : data.function,
                    "hash" : data.hash.slice(0,4) + '...' + data.hash.slice(data.hash.length - 4),
                    "from" : data.from.slice(0,4) + '...' + data.from.slice(data.from.length - 4)
                }
                setRows((items) => [row, ...items.slice(0, num)])
            }
        })
    }, []);

    return (
        <div>
            {columns && rows.length > 0 && 
            <div>
                <DataGrid columns={columns} rows={rows} style={{height:"500px"}} />
            </div>}

            { rows.length === 0 && 
                <div style={{margin: "50px", textAlign: "center"}}>
                    <div>Waiting for transactions...</div>
                    <div>
                        <img src="/images/preloader/logo.gif" />
                    </div>
                </div>
            }
        </div>
    )

}

export default PushNotifications;