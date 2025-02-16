import * as countryList from './countries'
import * as country from './country'

const countryFixtures = {
  ...country,
  ...countryList,
} as const

export default countryFixtures
