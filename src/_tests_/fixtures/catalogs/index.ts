import * as faChangeType from './faChangeType'
import * as infrastructureWorkTypes from './infrastructureWorkTypes'
import * as locations from './locations'
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
  ...locations,
  ...resolutionClassifications,
  ...infrastructureWorkTypes,
  ...urgencyRateTypes,
} as const

export default catalogsFixtures
