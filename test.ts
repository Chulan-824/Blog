const PaymentMethod = {
  CreditCard: 'credit-card',
  DebitCard: 'debit-card',
  Bitcoin: 'bitcoin',
  /** @deprecated 2025年4月30日后将不再接受支票 */
  Check: 'check',
} as const

type Aa = (typeof PaymentMethod)[keyof typeof PaymentMethod]

const me = Aa.CreditCard
console.log(me)
