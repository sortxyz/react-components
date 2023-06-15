import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import TimeAgo from 'javascript-time-ago';

import LatestTransactions from '../src/components/LatestTransactions';

import {
  TWENTY_FIVE_TRANSACTIONS_DATA,
  TWENTY_FIVE_TRANSACTIONS_COUNT,
  INVALID_CONTRACT_ADDRESS_DATA,
  INVALID_CONTRACT_ADDRESS_COUNT,
} from './__mocks__/LatestTransactionsMockedData';

interface ExpectedCell {
  type: 'link' | 'text';
  href?: string;
  text: string;
}

// const BLOCKCHAINS = ['ethereum', 'polygon', 'goerli'];
const BLOCKCHAINS = ['ethereum'];

const HEADERS = [
  'Hash',
  'Method',
  'Type',
  'Block',
  'Age',
  'From',
  'To',
  'Value',
];

const blockExplorerURL: Record<string, string> = {
  ethereum: 'https://etherscan.io',
  polygon: 'https://polygonscan.com',
  goerli: 'https://goerli.etherscan.io',
};

const mockFetchResponses = (responseData: any, countData: any) => {
  fetchMock
    .mockResponseOnce(JSON.stringify(responseData))
    .mockResponseOnce(JSON.stringify(countData));
};

const renderComponent = (
  blockchain: string,
  contractAddress: string,
  apiKey: string,
  apiServer?: string,
) => {
  if (!apiServer) {
    render(
      <LatestTransactions
        contract_address={contractAddress}
        blockchain={blockchain}
        api_key={apiKey}
        enableVirtualization={false}
      />,
    );
  } else {
    render(
      <LatestTransactions
        contract_address={contractAddress}
        blockchain={blockchain}
        api_key={apiKey}
        api_server={apiServer}
        enableVirtualization={false}
      />,
    );
  }
};

const createExpectedValues = (
  blockchain: string,
  transactionData: any,
): ExpectedCell[][] => {
  // Create formatter (English)
  const timeAgo = new TimeAgo('en-US');

  return transactionData.data.records.map((record) => [
    {
      type: 'link',
      href: `${blockExplorerURL[blockchain]}/tx/${record.hash}`,
      text: record.hash,
    },
    { type: 'text', text: record.method },
    { type: 'text', text: record.type },
    { type: 'text', text: record.block_number.toString() },
    { type: 'text', text: timeAgo.format(new Date(record.timestamp)) },
    {
      type: 'link',
      href: `${blockExplorerURL[blockchain]}/address/${record.from_address}`,
      text: record.from_address,
    },
    {
      type: 'link',
      href: `${blockExplorerURL[blockchain]}/address/${record.to_address}`,
      text: record.to_address,
    },
    { type: 'text', text: `${record.value.toString()} ETH` },
  ]);
};

const validateTransactionData = (
  allCells: HTMLElement[],
  expectedValues: ExpectedCell[][],
) => {
  expectedValues.forEach((expectedRow, index) => {
    const row = allCells.slice(index * 8, index * 8 + 8);
    expectedRow.forEach(async (expectedCell, cellIndex) => {
      const cell = row[cellIndex];
      if (expectedCell.type === 'link') {
        await waitFor(() => {
          const link = cell.querySelector('a');
          expect(link).toBeInTheDocument();
          expect(link?.href).toEqual(expectedCell.href);
          expect(link?.textContent).toEqual(expectedCell.text);
        });
      } else if (expectedCell.type === 'text') {
        expect(cell.textContent).toEqual(expectedCell.text);
      }
    });
  });
};

describe('LatestTransactions', () => {
  beforeAll(() => {
    // Disable spurious act warnings
    // Reference 1: https://github.com/facebook/react/pull/22561
    // Reference 2: https://github.com/reactwg/react-18/discussions/102
    // Reference 3: https://github.com/testing-library/react-testing-library/issues/1108
    global.IS_REACT_ACT_ENVIRONMENT = false;
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('Rendering and Data Fetching', () => {
    test('renders loading screen', () => {
      mockFetchResponses(
        TWENTY_FIVE_TRANSACTIONS_DATA,
        TWENTY_FIVE_TRANSACTIONS_COUNT,
      );
      renderComponent('ethereum', '0x1234', 'test_key');
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    test('fetches data', async () => {
      mockFetchResponses(
        TWENTY_FIVE_TRANSACTIONS_DATA,
        TWENTY_FIVE_TRANSACTIONS_COUNT,
      );

      renderComponent('ethereum', '0x1234', 'test_key');

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('Latest transactions')).toBeInTheDocument(),
      );
    });

    test('renders transaction data table headers + rows (ethereum)', async () => {
      const blockchain = 'ethereum';

      mockFetchResponses(
        TWENTY_FIVE_TRANSACTIONS_DATA,
        TWENTY_FIVE_TRANSACTIONS_COUNT,
      );

      renderComponent(blockchain, '0x1234', 'test_key');

      await waitFor(() =>
        expect(screen.getByText('Latest transactions')).toBeInTheDocument(),
      );

      HEADERS.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });

      const allCells = await screen.getAllByRole('gridcell');
      const expectedValues = createExpectedValues(
        blockchain,
        TWENTY_FIVE_TRANSACTIONS_DATA,
      );

      validateTransactionData(allCells, expectedValues);
    });
  });

  describe('Validation and Error Handling', () => {
    test('shows "0 transactions" when given an invalid contract address', async () => {
      mockFetchResponses(
        INVALID_CONTRACT_ADDRESS_DATA,
        INVALID_CONTRACT_ADDRESS_COUNT,
      );

      renderComponent(
        'ethereum',
        '0x887f3909c14dabd9e9510128ca6cbb448e932d7',
        'test_key',
      );

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('0 transactions')).toBeInTheDocument(),
      );
    });

    // TODO: This error handling doesn't exist in the component yet
    xtest('shows "Invalid Blockchain" when given an invalid blockchain', async () => {
      mockFetchResponses('FILL_ME_IN', 'FILL_ME_IN');

      renderComponent('anthoneum', 'FILL_ME_IN', 'FILL_ME_IN');

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('Invalid Blockchain')).toBeInTheDocument(),
      );
    });

    // TODO: This error handling doesn't exist in the component yet
    xtest('shows "Invalid API Key" when given an invalid API Key', async () => {
      mockFetchResponses('FILL_ME_IN', 'FILL_ME_IN');

      renderComponent('ethereum', 'FILL_ME_IN', 'FILL_ME_IN');

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('Invalid API Key')).toBeInTheDocument(),
      );
    });

    // TODO: This error handling doesn't exist in the component yet
    xtest('shows "Invalid API Server URL" when given an invalid API server URL', async () => {
      mockFetchResponses('FILL_ME_IN', 'FILL_ME_IN');

      renderComponent('ethereum', 'FILL_ME_IN', 'FILL_ME_IN', 'FILL_ME_IN');

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('Invalid API URL')).toBeInTheDocument(),
      );
    });
  });

  // WIP: Will resolve as I refactor the component
  xdescribe('Styling and Appearance', () => {
    test('background color of the table is white when "dark" mode is enabled', async () => {
      mockFetchResponses(
        TWENTY_FIVE_TRANSACTIONS_DATA,
        TWENTY_FIVE_TRANSACTIONS_COUNT,
      );

      renderComponent(
        'ethereum',
        '0x887f3909c14dabd9e9510128ca6cbb448e932d7',
        'test_key',
      );

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));

      const mainContainer = screen.getByTestId('main-container');
      expect(mainContainer).toHaveStyle('background-color: #0e1420');
    });

    test('background color of the table is white when "light" mode is enabled', async () => {
      mockFetchResponses(
        TWENTY_FIVE_TRANSACTIONS_DATA,
        TWENTY_FIVE_TRANSACTIONS_COUNT,
      );

      renderComponent(
        'ethereum',
        '0x887f3909c14dabd9e9510128ca6cbb448e932d7',
        'test_key',
      );

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));

      const mainContainer = screen.getByTestId('main-container');
      expect(mainContainer).toHaveStyle('background-color: white');
    });
  });

  // WIP: Fix pagination in the component and build out this test
  xdescribe('Pagination', () => {
    test('can navigate to next and previous page', async () => {
      const nextPageData = [
        /* Next page transaction data */
      ];
      const nextPageCount = 50; // Total transactions count for the next page

      const prevPageData = [
        /* Previous page transaction data */
      ];
      const prevPageCount = 50; // Total transactions count for the previous page

      // Mock response for the initial page
      mockFetchResponses(
        TWENTY_FIVE_TRANSACTIONS_DATA,
        TWENTY_FIVE_TRANSACTIONS_COUNT,
      );

      // Mock response for the next page
      fetchMock.mockResponseOnce(JSON.stringify(nextPageData));
      fetchMock.mockResponseOnce(JSON.stringify(nextPageCount));

      // Mock response for the previous page
      fetchMock.mockResponseOnce(JSON.stringify(prevPageData));
      fetchMock.mockResponseOnce(JSON.stringify(prevPageCount));

      renderComponent('ethereum', '0x1234', 'test_key');

      // Initial page
      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('25 transactions')).toBeInTheDocument(),
      );

      // Next page
      const nextButton = screen.getByRole('button', { name: 'Next' });
      userEvent.click(nextButton);

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(4));
      await waitFor(() =>
        expect(screen.getByText('50 transactions')).toBeInTheDocument(),
      );

      // Previous page
      const prevButton = screen.getByRole('button', { name: 'Previous' });
      userEvent.click(prevButton);

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(6));
      await waitFor(() =>
        expect(screen.getByText('25 transactions')).toBeInTheDocument(),
      );

      // Validate the transaction data for the previous and current page
      const allCells = screen.getAllByRole('gridcell');
      const expectedPrevPageValues = createExpectedValues(
        'ethereum',
        prevPageData,
      );
      const expectedCurrentPageValues = createExpectedValues(
        'ethereum',
        TWENTY_FIVE_TRANSACTIONS_DATA,
      );

      validateTransactionData(allCells, expectedPrevPageValues);
      validateTransactionData(allCells, expectedCurrentPageValues);
    });
  });
});
