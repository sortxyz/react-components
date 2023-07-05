# [sort.xyz](https://sort.xyz) react components

> 🧪 This project is currently in ALPHA which means you can expect bugs and API
> changes.  
> Feedback? Let us know by [opening an issue](https://github.com/sortxyz/react-components/issues).

---

React components created to simplify web3 UI application development.

_Note: To use these components you'll need a [free Sort API key](https://docs.sort.xyz/docs/api-keys)._

1. [`<SQLQuery/>`](#sqlquery)
1. [`<LatestTransactions/>`](#latesttransactions)
1. [`<PushNotifications/>`](#pushnotifications)

## Installation

```sh
npm install @sort/react-components
```

or load from the [unpkg CDN](https://www.unpkg.com/):

```html
<script src="https://unpkg.com/@sort/react-components/lib/index.js"></script>
```

## Components

### SQLQuery

Execute a SQL query and display as a table

```jsx
import { SQLQuery } from "@sort/react-components";

<SQLQuery
  query="select * from polygon.transaction where to_address='0xd1f9c58e33933a993a3891f8acfe05a68e1afc05' order by block_id desc"
  api_key="API_KEY"
  />
```

![sql query](./readme-imgs/sql-query.png)

Explore the [interactive example](https://sort.xyz/contracts/matic/0xd1f9c58e33933a993a3891f8acfe05a68e1afc05/sql).

### LatestTransactions

Show your latest transactions in a table

```jsx
import { LatestTransactions } from "@sort/react-components";

<LatestTransactions
   contract_address="0xd1f9c58e33933a993a3891f8acfe05a68e1afc05"
   chain="polygon"
   api_key="API_KEY"
   theme="dark"
 />
```

![sql query](./readme-imgs/latest-txns.png)

Explore the [interactive example](https://sort.xyz/contracts/matic/0xd1f9c58e33933a993a3891f8acfe05a68e1afc05/sql).

### PushNotifications

Visualize real-time contract events

```jsx
import { PushNotifications } from "@sort/react-components";

<PushNotifications
    contract_address="0xd1f9c58e33933a993a3891f8acfe05a68e1afc05"
    contract_function=""
    num={10}
/>
```

Explore the [interactive example](https://sort.xyz/contracts/matic/0xd1f9c58e33933a993a3891f8acfe05a68e1afc05/push)

## Feedback

🧪 This project is currently in ALPHA which means you can expect bugs and API
changes. Feedback? Please let us know by opening an issue.

## More information

Find out more about what you can build using Sort today at
https://docs.sort.xyz.

## Security

If you believe you have found a security vulnerability, we encourage you to
responsibly disclose this and not open a public issue. We will investigate all
legitimate reports. Email security@sort.xyz to disclose any security
vulnerabilities.


## Contributing


### Test your change

#### Run a local build

```bash
npm run build
```

#### Link the package

```bash
# do this in this repo
npm run link
```

#### Link the package in your project

```bash
# do this in your project
npm run link @sort/react-components
```

### Prepare for release

if everything works as expected, go ahead and make the commit


#### How to write commits

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), if you're not familiar with it, please take a look as it will determine the type of release that is created.
