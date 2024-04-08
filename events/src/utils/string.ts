import moment from 'moment';

export const formateDateString = (value: string) => moment(value).format('DD/MM/YYYY HH:mm');

export const titleCase = (value: string) =>
  value.replace(/\b\w+/g, (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());

export const stripNonNumeric = (value: string, allowDecimal = true): string => {
  let newValue = value;
  if (allowDecimal) {
    // remove all except the first decimal point
    const [wholeNum, decimal, ...rest] = value.split('.');
    if (decimal !== undefined) {
      newValue = [[wholeNum, decimal].join('.'), ...rest].join('');
    }
  }

  return newValue.replace(new RegExp(`[^-\\d${allowDecimal ? '.' : ''}]`, 'g'), '');
};

export const numberInputValue = (value: number) => (Number.isNaN(value) ? '' : value);

export const priceString = (value: string) => parseFloat(stripNonNumeric(value)).toFixed(2);
