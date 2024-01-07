import React from 'react';

export interface Input {
  label: string;
  labelAlt?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  name: string;
  disabled?: boolean;
  valueAlt?: string;
  placeholder?: string;
  valid?: boolean;
  max?: string;
  value?: string;
  onChange?: (val: string) => void;
  error?: string | React.ReactNode;
}
