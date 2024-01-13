export interface Button {
  onClick?: () => void;
  text: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
  variant?:
    | 'primary'
    | 'primary-alt'
    | 'secondary'
    | 'tertiary'
    | 'action'
    | 'accent'
    | 'danger'
    | 'info'
    | 'action2';
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  loadingType?: ButtonLoadingState;
}

export enum ButtonLoadingState {
  repay = 'Repaying',
  deposit = 'Depositing',
  borrow = 'Borrowing',
  withdraw = 'Withdrawing',
  approve = 'Approving',
  setup = 'Setting up',
}
