import * as country from './country'
import * as countryList from './countryList'

const countryFixtures = {
  ...country,
  ...countryList,
} as const

export default countryFixtures
