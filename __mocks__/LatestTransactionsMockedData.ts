export interface TransactionRecord {
  hash: string;
  method: string;
  type: string;
  block_number: number;
  timestamp: string;
  from_address: string;
  to_address: string;
  value: string;
}

export interface TransactionsData {
  code: number;
  data: {
    durationMs: number;
    id?: string;
    query: string;
    records: TransactionRecord[];
    recordCount: number;
  };
}

export interface TransactionsCount {
  code: number;
  data: {
    durationMs: number;
    id?: string;
    query: string;
    records: { count: string }[];
    recordCount: number;
  };
}

export const TWENTY_FIVE_TRANSACTIONS_DATA: TransactionsData = {
  code: 200,
  data: {
    durationMs: 565.8092837333679,
    id: '9326e5a9-03bd-40c2-8238-bd874b09686c',
    query:
      "select transaction_hash as hash, function as method, b.block_number, b.timestamp, t.from_address, t.to_address, t.value / 1e18 as value from ethereum.transaction t, ethereum.block b where to_address = '0x887f3909c14dabd9e9510128ca6cbb448e932d7f' and t.block_id = b.id order by b.block_number desc limit 25 offset 0",
    records: [
      {
        hash: '0xdbd1279ba9693b722dc895276e305b69291c765c58f8948e391affa47e9729ce',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17472869,
        timestamp: '2023-06-13T18:32:23.000Z',
        from_address: '0xa8539fe0f1115c987ed98930f51756f99f4a4643',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x5726447a92a341c87e774d92b562d0f7390927b670b4a52e568c911027a827d9',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17436879,
        timestamp: '2023-06-08T16:53:23.000Z',
        from_address: '0x64601adaa0048cb5d3c6ea450d1eaf6e4b23056d',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x19c4857f2e63cbc798418c2ec8e21abd09768c2b52b0bfe04767abd861515ba9',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17419143,
        timestamp: '2023-06-06T04:48:23.000Z',
        from_address: '0x4c42a501fc8a06b61bb96d81a57e2087e2a8a814',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x8a850833ef256931029f09b10d8cd54bec75308ffedd2d31a137932d0bfe1216',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17390339,
        timestamp: '2023-06-02T03:16:47.000Z',
        from_address: '0x8e6c2fa200ccaf6d61d2093e9aa529e57074cd43',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x19bc128120e1e0ee9d9320c63da10fff49d203b3a03f3325d48cfe526a58d028',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17336926,
        timestamp: '2023-05-25T15:03:47.000Z',
        from_address: '0x3ee7a3ff58e5d22cbe1b5767dacb16625712b5de',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x0247c280d95b0a347d7e357ce59e6795bd7badda5072c6f02492b25fba250160',
        method: 'presale',
        type: 'Transaction',
        block_number: 17336417,
        timestamp: '2023-05-25T13:20:47.000Z',
        from_address: '0x3ee7a3ff58e5d22cbe1b5767dacb16625712b5de',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x9b7f2c4f3c40f4081fa5e1fb4b877c49d780380d95d700645274581381ce0975',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17322020,
        timestamp: '2023-05-23T12:45:35.000Z',
        from_address: '0xb54786fbd001194aeef0e3292cb241d48bc124aa',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x68b41ef54fe9b6b520a64cc2d7580c311039e8a8f7ebaec6c808a1e1fd9f6d14',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17309976,
        timestamp: '2023-05-21T20:02:35.000Z',
        from_address: '0x3a2ff6e85b0c5463bae870a383461738ae582348',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x45d337d182ed5ebd5100cf85e2c81230137d9948bd8b2aeee609c5670ca5d44a',
        method: 'presale',
        type: 'Transaction',
        block_number: 17248441,
        timestamp: '2023-05-13T03:36:59.000Z',
        from_address: '0xf0b3838413c14ed73474a1cef319780d90ee58ce',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x4b178db9c3085a9b78a6ef622f8882c8c01fd8365a84d28ef3dd81f8fcb40c7e',
        method: 'presale',
        type: 'Transaction',
        block_number: 17246395,
        timestamp: '2023-05-12T20:41:47.000Z',
        from_address: '0x72e547a8f0c04363cb285b9d242d29a5f0b49d1e',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x65f5465f181685470aa96469de6cfc647d0f364ce153de3fc25e62d0f0c3f1c9',
        method: 'presale',
        type: 'Transaction',
        block_number: 17245906,
        timestamp: '2023-05-12T18:59:47.000Z',
        from_address: '0xb9a5eaa560c2c396c7feba5ccedbe969863f5cc9',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x90eba73578602ec47ef0f6475c491c21aa6f4f175e6a938d8dee3b6d537617f3',
        method: 'setMerkleRoot',
        type: 'Transaction',
        block_number: 17227178,
        timestamp: '2023-05-10T02:56:35.000Z',
        from_address: '0x1d9016c9131ef6c56310a7246e5efcecbc79c786',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x023623a983f01959fa9a3ac4d8b862181e6e3380433badcf4cf1ce2dbacdd99b',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17155962,
        timestamp: '2023-04-30T02:41:47.000Z',
        from_address: '0xe485656ec623115bf2d445b925db5d63707bf74b',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0xb13d408c0c16e28ad90e82c8b7b16d5e9b5e4b53907aebe49cf7169744f76e3c',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17152773,
        timestamp: '2023-04-29T15:55:59.000Z',
        from_address: '0xa67b621ea4d0f4fb817eac56013cc4b49f818e71',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x3030412d376ca6af1e992c09c1a1a80e2aa23f7f7ee8436ba83be4b8d2357fcc',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17147672,
        timestamp: '2023-04-28T22:43:23.000Z',
        from_address: '0x397525416cc61a2c186ad428f450a17aae5f3246',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x0e3a8990cdff7699a1f40a6b0d605957f1322e0250741a275894df8ac4ac9496',
        method: 'presale',
        type: 'Transaction',
        block_number: 17147647,
        timestamp: '2023-04-28T22:38:23.000Z',
        from_address: '0x397525416cc61a2c186ad428f450a17aae5f3246',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x35b9d596237e18e576faa41a0629b17d2f51aeae5d308ecf00ef670ba83c0797',
        method: 'presale',
        type: 'Transaction',
        block_number: 17127456,
        timestamp: '2023-04-26T02:33:11.000Z',
        from_address: '0xd5106e916bbdf5f86f9781ddb0e44ff089e455e6',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0xd9123dc6befa33b2c579acd4a49ef26c28316eedb954b54dfd3a505e50dd9cd1',
        method: 'presale',
        type: 'Transaction',
        block_number: 17108608,
        timestamp: '2023-04-23T11:06:47.000Z',
        from_address: '0x9b18605030209de50a84564e998b6b2ced552be6',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0xdbb6053b60a369ed9a2c2493b835fcf7bed494e55ae379fc534eead642fbef04',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17107965,
        timestamp: '2023-04-23T08:56:47.000Z',
        from_address: '0x57f1c2d5e9d8277be03951e6c9cd5e0bfc41e967',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x0d9d0f54af344b53e08ca2b4e13822c9ac2263588703c8f4fe9890fc587b8b17',
        method: 'presale',
        type: 'Transaction',
        block_number: 17098121,
        timestamp: '2023-04-21T23:49:35.000Z',
        from_address: '0xd6b324a9b7f4101aa2af369030d4faf5c1c3bebf',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x0e9a4f90fbf07c79400155b55814b8da390299e7b358e0813f1ad632799e648f',
        method: 'presale',
        type: 'Transaction',
        block_number: 17097110,
        timestamp: '2023-04-21T20:25:35.000Z',
        from_address: '0xde1cf0510c997b09b5c472a9f622c7018d18bbef',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0xb774448a465ede32d4241bef7a07ab86c33b7891776b95c505f56e4aaa6a26b2',
        method: 'setApprovalForAll',
        type: 'Transaction',
        block_number: 17096471,
        timestamp: '2023-04-21T18:15:47.000Z',
        from_address: '0x7b1745e3a867eca2b8d0a3f8eb454ba0273946a8',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x0f18881d8d58a1ff39730078d627ff40311bba7493fc4f84730024004968c069',
        method: 'presale',
        type: 'Transaction',
        block_number: 17096417,
        timestamp: '2023-04-21T18:04:59.000Z',
        from_address: '0x7b1745e3a867eca2b8d0a3f8eb454ba0273946a8',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x578c956717cf5fcdd01cb5b3d1b2533c72d386414201b3442f4aa1c0a9c4e8a5',
        method: 'presale',
        type: 'Transaction',
        block_number: 17096022,
        timestamp: '2023-04-21T16:43:59.000Z',
        from_address: '0x2c58fba287e3d85b1e1043be1bb2e2e7ddeffc2f',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
      {
        hash: '0x6b09c5232d5327c369b65cd7e4c88855e7823024b3ef719ce06f54f98d04cef3',
        method: 'presale',
        type: 'Transaction',
        block_number: 17095914,
        timestamp: '2023-04-21T16:22:23.000Z',
        from_address: '0x7f4a90bd22c54e17aefd83d995eb287a7e124938',
        to_address: '0x887f3909c14dabd9e9510128ca6cbb448e932d7f',
        value: '0.000000000000000000000000000000000000',
      },
    ],
    recordCount: 25,
  },
};

export const TWENTY_FIVE_TRANSACTIONS_COUNT: TransactionsCount = {
  code: 200,
  data: {
    durationMs: 16.562161922454834,
    id: '65418e3e-608f-472d-aa91-3a4a5d736109',
    query:
      "select count(*) from ethereum.transaction t where t.to_address = '0x887f3909c14dabd9e9510128ca6cbb448e932d7f'",
    records: [
      {
        count: '25',
      },
    ],
    recordCount: 1,
  },
};

export const INVALID_CONTRACT_ADDRESS_DATA: TransactionsData = {
  code: 200,
  data: {
    durationMs: 17.724193572998047,
    query:
      "select transaction_hash as hash, function as method, b.block_number, b.timestamp, t.from_address, t.to_address, t.value / 1e18 as value from ethereum.transaction t, ethereum.block b where to_address = '0x887f3909c14dabd9e9510128ca6cbb448e932d7' and t.block_id = b.id order by b.block_number desc limit 25 offset 0",
    records: [],
    recordCount: 0,
  },
};

export const INVALID_CONTRACT_ADDRESS_COUNT: TransactionsCount = {
  code: 200,
  data: {
    durationMs: 17.031200885772705,
    id: 'f188fd1a-531f-4ab1-bd84-602d4d8e83b4',
    query:
      "select count(*) from ethereum.transaction t where t.to_address = '0x887f3909c14dabd9e9510128ca6cbb448e932d7'",
    records: [
      {
        count: '0',
      },
    ],
    recordCount: 1,
  },
};
