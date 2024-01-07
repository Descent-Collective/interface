type Collateral = {
  totalDepositedCollateral: string;
  totalBorrowedAmount: string;
  liquidationThreshold: string;
  debtCeiling: string;
  rate: string;
  minDeposit: string;
  collateralPrice: string;
};

const defaultCollateral: Collateral = {
  totalDepositedCollateral: '0.0',
  totalBorrowedAmount: '0.0',
  liquidationThreshold: '0.0',
  debtCeiling: '0.0',
  rate: '0.0',
  minDeposit: '0.0',
  collateralPrice: '0.0',
};

export type { Collateral };
export { defaultCollateral };
