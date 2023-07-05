import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import TimeAgo from 'javascript-time-ago';

import LatestTransactions from '.';

import {
  INVALID_CONTRACT_ADDRESS,
  INVALID_CONTRACT_COUNT_RESPONSE,
  INVALID_CONTRACT_RECORDS_RESPONSE,
  TWENTY_FIVE_TRANSACTIONS_CONTRACT_ADDRESS,
  TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
  TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
  FIFTY_ONE_TRANSACTIONS_CONTRACT_ADDRESS,
  FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
  FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_ONE,
  FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_TWO,
  FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_THREE,
  TransactionsData,
  TransactionsCount,
} from '../../__mocks__/LatestTransactions';

interface ExpectedCell {
  type: 'link' | 'text';
  href?: string;
  text: string;
}

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

const blockchainCurrency: Record<string, string> = {
  ethereum: 'ETH',
  polygon: 'MATIC',
  goerli: 'GETH',
};

const mockFetchResponses = (
  responses: (TransactionsData | TransactionsCount)[],
) => {
  responses.forEach((response) =>
    fetchMock.mockResponseOnce(JSON.stringify(response)),
  );
};

const renderComponent = (
  blockchain: string,
  contractAddress: string,
  apiKey: string,
  apiServer?: string,
) => {
  render(
    <LatestTransactions
      contract_address={contractAddress}
      blockchain={blockchain}
      api_key={apiKey}
      api_server={apiServer || undefined}
      enableVirtualization={false}
    />,
  );
};

const createExpectedValues = (
  blockchain: string,
  transactionsData: TransactionsData,
): ExpectedCell[][] => {
  // Create formatter (English)
  const timeAgo = new TimeAgo('en-US');

  return transactionsData.data.records.map((record) => [
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
    {
      type: 'text',
      text: `${record.value.toString()} ${blockchainCurrency[blockchain]}`,
    },
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

const navigateAndVerify = async (
  direction: 'next' | 'prev',
  expectedText: string,
  expectedCalls: number,
) => {
  const buttonId = direction === 'next' ? 'right-arrow' : 'left-arrow';
  const button = screen.getByTestId(buttonId);
  userEvent.click(button);

  await waitFor(() =>
    expect(fetchMock.mock.calls.length).toEqual(expectedCalls),
  );
  await waitFor(() =>
    expect(screen.getByText(expectedText)).toBeInTheDocument(),
  );
};

describe('LatestTransactions', () => {
  // Disable spurious act warnings
  // Reference 1: https://github.com/facebook/react/pull/22561
  // Reference 2: https://github.com/reactwg/react-18/discussions/102
  // Reference 3: https://github.com/testing-library/react-testing-library/issues/1108
  beforeAll(() => {
    global.IS_REACT_ACT_ENVIRONMENT = false;
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  describe('Rendering and Data Fetching', () => {
    test('renders loading screen', () => {
      mockFetchResponses([
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent(
        'ethereum',
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    test('fetches data', async () => {
      mockFetchResponses([
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent(
        'ethereum',
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() => expect(screen.getByText('1-25')).toBeInTheDocument());
    });

    test('(Ethereum) renders transaction data table headers + rows', async () => {
      const blockchain = 'ethereum';

      mockFetchResponses([
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent(
        blockchain,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      // await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));)

      await waitFor(() => expect(screen.getByText('1-25')).toBeInTheDocument());

      HEADERS.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });

      const allCells = await screen.findAllByRole('gridcell');
      const expectedValues = createExpectedValues(
        blockchain,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      );

      validateTransactionData(allCells, expectedValues);
    });

    test('(Polygon) renders transaction data table headers + rows', async () => {
      const blockchain = 'polygon';

      mockFetchResponses([
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent(
        blockchain,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      await waitFor(() => expect(screen.getByText('1-25')).toBeInTheDocument());

      HEADERS.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });

      const allCells = await screen.findAllByRole('gridcell');
      const expectedValues = createExpectedValues(
        blockchain,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      );

      validateTransactionData(allCells, expectedValues);
    });

    test('(Goerli) renders transaction data table headers + rows', async () => {
      const blockchain = 'goerli';

      mockFetchResponses([
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent(blockchain, '0x1234', 'test_key');

      await waitFor(() => expect(screen.getByText('1-25')).toBeInTheDocument());

      HEADERS.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });

      const allCells = await screen.findAllByRole('gridcell');
      const expectedValues = createExpectedValues(
        blockchain,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      );

      validateTransactionData(allCells, expectedValues);
    });
  });

  describe('Validation and Error Handling', () => {
    test('shows "0 transactions" when given an invalid contract address', async () => {
      mockFetchResponses([
        INVALID_CONTRACT_COUNT_RESPONSE,
        INVALID_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent('ethereum', INVALID_CONTRACT_ADDRESS, 'test_key');

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('0 transactions')).toBeInTheDocument(),
      );
    });

    xtest('shows "Invalid Blockchain" when given an invalid blockchain', async () => {
      // @ts-expect-error - TODO: This error handling doesn't exist in the component yet
      mockFetchResponses(['FILL_ME_IN', 'FILL_ME_IN']);

      renderComponent('anthoneum', 'FILL_ME_IN', 'FILL_ME_IN');

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('Invalid Blockchain')).toBeInTheDocument(),
      );
    });

    xtest('shows "Invalid API Key" when given an invalid API Key', async () => {
      // @ts-expect-error TODO: This error handling doesn't exist in the component yet
      mockFetchResponses(['FILL_ME_IN', 'FILL_ME_IN']);

      renderComponent('ethereum', 'FILL_ME_IN', 'FILL_ME_IN');

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() =>
        expect(screen.getByText('Invalid API Key')).toBeInTheDocument(),
      );
    });

    xtest('shows "Invalid API Server URL" when given an invalid API server URL', async () => {
      // @ts-expect-error TODO: This error handling doesn't exist in the component yet
      mockFetchResponses(['FILL_ME_IN', 'FILL_ME_IN']);

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
      mockFetchResponses([
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent(
        'ethereum',
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));

      const mainContainer = screen.getByTestId('main-container');
      expect(mainContainer).toHaveStyle('background-color: #0e1420');
    });

    test('background color of the table is white when "light" mode is enabled', async () => {
      mockFetchResponses([
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE,
      ]);

      renderComponent(
        'ethereum',
        TWENTY_FIVE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));

      const mainContainer = screen.getByTestId('main-container');
      expect(mainContainer).toHaveStyle('background-color: white');
    });
  });

  // WIP: Fix pagination in the component and build out this test
  // TODO: Add a new Data and Count mock that has greater than 25 transactions
  describe('Pagination', () => {
    test('can navigate to next and previous page', async () => {
      mockFetchResponses([
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_ONE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_TWO,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_ONE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_TWO,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_THREE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_TWO,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_ONE,
      ]);

      renderComponent(
        'ethereum',
        FIFTY_ONE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      // Initial page
      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() => expect(screen.getByText('1-25')).toBeInTheDocument());

      // Navigate through the pages and verify
      await navigateAndVerify('next', '26-50', 4);
      await navigateAndVerify('prev', '1-25', 6);
      await navigateAndVerify('next', '26-50', 8);
      await navigateAndVerify('next', '51-51', 10);
      await navigateAndVerify('prev', '26-50', 12);
      await navigateAndVerify('prev', '1-25', 14);
    });

    test('stays on the first page if previous page button is clicked', async () => {
      mockFetchResponses([
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_ONE,
      ]);

      renderComponent(
        'ethereum',
        FIFTY_ONE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      // Initial page
      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() => expect(screen.getByText('1-25')).toBeInTheDocument());

      // Try to navigate to the previous page
      await navigateAndVerify('prev', '1-25', 2);
    });

    test('stays on the last page if next page button is clicked', async () => {
      mockFetchResponses([
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_ONE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_TWO,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_COUNT_RESPONSE,
        FIFTY_ONE_TRANSACTIONS_CONTRACT_RECORDS_RESPONSE_PAGE_THREE,
      ]);

      renderComponent(
        'ethereum',
        FIFTY_ONE_TRANSACTIONS_CONTRACT_ADDRESS,
        'test_key',
      );

      // Initial page
      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(2));
      await waitFor(() => expect(screen.getByText('1-25')).toBeInTheDocument());

      // Navigate to the last page
      await navigateAndVerify('next', '26-50', 4);
      await navigateAndVerify('next', '51-51', 6);

      // Try to navigate past the last page
      await navigateAndVerify('next', '51-51', 6);
    });
  });
});
