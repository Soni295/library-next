export function formatPrice(price: number) {
  let tmpPrice = price.toFixed(2).split('.');
  tmpPrice[0] = tmpPrice[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return tmpPrice.join(',');
}
