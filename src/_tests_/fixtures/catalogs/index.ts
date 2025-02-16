import * as faChangeType from './faChangeTypes'
import * as infrastructureWorkTypes from './infrastructureWorkTypes'
import * as locations from './locations'
import * as resolutionClassifications from './resolutionClassifications'
import * as subTaskTemplate from './subTaskTemplates'
import * as timeZone from './timeZones'
import * as urgencyRateTypes from './urgencyRateTypes'
import * as userStatus from './userStatuses'

const catalogsFixtures = {
  ...faChangeType,
  ...subTaskTemplate,
  ...timeZone,
  ...userStatus,
  ...locations,
  ...resolutionClassifications,
  ...urgencyRateTypes,
  ...infrastructureWorkTypes,
} as const

export default catalogsFixtures
