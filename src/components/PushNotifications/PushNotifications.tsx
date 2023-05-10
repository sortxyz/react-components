import React, { useState, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import styles from "../styles/global.module.css";

const Pusher = require('pusher-js');

export interface PushNotificationsProps {
    /**
     * Contract address to look for notifications
     */
    contract_address: string;

    /**
     * Function name for filtering
     */
    function_name?: string;

    /**
     * Number of results to display, default to 10
     */
    num?: number;

    /**
     * Height of result grid, default to 500px
     */
    height?: string;

    /**
     * CSS theme, light or dark, default to dark
     */
    theme?: string
}

const PushNotifications = ({
    contract_address, 
    num=10, 
    function_name="",
    height="500px",
    theme="dark"
  }: PushNotificationsProps) => {

    // Data rows in table
    const [rows, setRows] = React.useState<any[]>([]);

    // Date columns in table
    const [columns, setColumns] = React.useState<any[]>([]);

    useEffect(() => {
        // Set table columns
        setColumns([
            //{key:"date", name: "date", width: "25%"},
            {key:"hash", name: "Hash", width: "25%", headerCellClass: styles[theme+"-headerCell"], cellClass: styles[theme+"-colSpanClassname"]},
            {key:"from", name: "From", width: "25%", headerCellClass: styles[theme+"-headerCell"], cellClass: styles[theme+"-colSpanClassname"]},
            {key:"to", name: "To", width: "25%", headerCellClass: styles[theme+"-headerCell"], cellClass: styles[theme+"-colSpanClassname"]},
            {key:"function", name: "Function", width: "25%", headerCellClass: styles[theme+"-headerCell"], cellClass: styles[theme+"-colSpanClassname"]}
        ]);

        var pusher = new Pusher('ac91a1d4157ccb9e4203', {
            cluster: 'us2'
        })
    
        // Ethereum channels
        var ethereum_txn_channel = pusher.subscribe(contract_address)
        ethereum_txn_channel.bind('new', function (data:any) {
            let tx_function_name = data.function;

            if (!function_name || (tx_function_name && tx_function_name === function_name)) {
                let date_obj = new Date(new Date())
                data.timestamp_obj = date_obj
                
                let row = {
                    //"date" : date_obj.toISOString().slice(0, 16),
                    "function" : data.function,
                    "hash" : <a href={'https://etherscan.com/tx/' + data.transaction_hash} target="_blank">{data.transaction_hash}</a>,
                    "from" : <a href={'https://etherscan.com/address/' + data.from_address} target="_blank">{data.from_address}</a>,
                    "to" : <a href={'https://etherscan.com/address/' + data.to_address} target="_blank">{data.to_address}</a>,
                }
                setRows((items) => [row, ...items.slice(0, num)])
            }
        })
    }, []);

    return (
        <div>
            {columns && rows.length > 0 && 
            <div>
                <DataGrid 
                    columns={columns} 
                    rows={rows} 
                    style={{width: "100%", height:height, border: (theme === 'dark' ? "0px solid white" : "0px solid black"), backgroundColor : "transparent"}} 
                    rowHeight={50}
                />
            </div>}

            { rows.length === 0 && 
                <div style={{margin: "50px", textAlign: "center"}}>
                    &nbsp;
                </div>
            }
           

           {columns && rows.length > 0 && 
            <div>
                <nav className={`${styles[theme + "-view-component"]}`}>
                    <a href="https://docs.sort.xyz/docs/push-notifications" target="_blank">
                        &#60; view react component &#62;
                    </a>
                </nav>
            </div>
            }
            
        </div>
    )

}

export default PushNotifications;