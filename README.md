# sort.xyz react components

## Execute and display a SQL query

```
<SQLQuery 
  query="select * from ethereum.transaction where to_address='0xdac17f958d2ee523a2206206994597c13d831ec7' order by block_id desc"
  api_key="API_KEY"
  />
```

## Push notifications for contract events

```
<PushNotifications
    contract_address="0xdac17f958d2ee523a2206206994597c13d831ec7"
    contract_function=""
    num={10}
/>
```
