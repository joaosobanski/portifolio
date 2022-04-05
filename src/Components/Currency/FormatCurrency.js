
export const numberFormat = (value) => {
  if (value)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  else
    return value
}