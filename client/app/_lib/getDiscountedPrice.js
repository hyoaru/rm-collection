export default function getDiscountedPrice({ originalPrice, discountRate }) {
  if (discountRate <= 0) { return originalPrice }
  const discount = originalPrice * (discountRate / 100)
  const discountedPrice = originalPrice - discount
  return discountedPrice
}