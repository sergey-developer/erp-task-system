import * as currency from './currency'
import * as currencyList from './currencyList'

const currencyFixtures = {
  ...currency,
  ...currencyList,
} as const

export default currencyFixtures
