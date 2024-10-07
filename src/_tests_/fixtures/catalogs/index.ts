import * as faChangeType from './faChangeType'
import * as location from './location'
import * as resolutionClassifications from './resolutionClassifications'
import * as subTaskTemplate from './subTaskTemplate'
import * as timeZone from './timeZone'
import * as urgencyRateTypes from './urgencyRateTypes'
import * as userStatus from './userStatus'

const catalogsFixtures = {
  ...faChangeType,
  ...subTaskTemplate,
  ...timeZone,
  ...userStatus,
  ...location,
  ...resolutionClassifications,
  ...urgencyRateTypes,
} as const

export default catalogsFixtures
