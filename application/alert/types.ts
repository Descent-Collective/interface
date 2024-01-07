type Alert = {
  variant: 'success' | 'error';
  message: React.ReactNode | string;
  title: string;
};

export type { Alert };
