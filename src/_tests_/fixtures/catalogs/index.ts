import * as faChangeType from './faChangeType'
import * as locations from './locations'
import * as resolutionClassifications from './resolutionClassifications'
import * as subTaskTemplate from './subTaskTemplate'
import * as timeZone from './timeZone'
import * as userStatus from './userStatus'

const catalogsFixtures = {
  ...faChangeType,
  ...subTaskTemplate,
  ...timeZone,
  ...userStatus,
  ...locations,
  ...resolutionClassifications,
} as const

export default catalogsFixtures
