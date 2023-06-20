export interface LatestTransactionsProps {
  /**
   * Contract address
   */
  contract_address: string;

  /**
   * Blockchain network
   */
  blockchain: string;

  /**
   * sort.xyz API key
   */
  api_key: string;

  /**
   * sort.xyz API server
   */
  api_server?: string;

  /**
   * Height of result grid, default to 600px
   */
  height?: string;

  /**
   * CSS theme, light or dark, default to dark
   */
  theme?: string;

  /**
   * Toggle on/off virtualization in DataGrid component (from react-data-grid)
   */
  enableVirtualization?: boolean;
}
