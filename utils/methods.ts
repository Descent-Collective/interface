const formatAddress = (address: string) => {
  if (!address || address.length < 9) {
    return address || 'Invalid address';
  }

  const firstFour = address.substring(0, 4);
  const lastFour = address.substring(address.length - 4);

  return `${firstFour}...${lastFour}`;
};

const formatLargeNumber = (amount: string | number) => {
  const num = Number(amount);
  if (num < 1000) {
    return num;
  }
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const value = formatter.format(num);
  const suffix = value[value.length - 1];
  const prefix = value.split(',')[0];
  return `${prefix}${suffix}`;
};

const roundupNumber = (amount: string | number) => {
  const num = Number(amount);
  return num.toFixed(2);
};

const formatAmount = (amount: string | number) => {
  const num = Number(amount).toLocaleString();

  return num;
};

const waitTime = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
export { formatAddress, formatLargeNumber, roundupNumber, formatAmount, waitTime };
