import * as faChangeType from './faChangeType'
import * as location from './location'
import * as resolutionClassifications from './resolutionClassifications'
import * as subTaskTemplate from './subTaskTemplate'
import * as timeZone from './timeZone'
import * as userStatus from './userStatus'

const catalogsFixtures = {
  ...faChangeType,
  ...subTaskTemplate,
  ...timeZone,
  ...userStatus,
  ...location,
  ...resolutionClassifications,
} as const

export default catalogsFixtures
