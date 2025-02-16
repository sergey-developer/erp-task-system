import * as faChangeTypes from './faChangeTypes'
import * as infrastructureWorkTypes from './infrastructureWorkTypes'
import * as locations from './locations'
import * as resolutionClassifications from './resolutionClassifications'
import * as subTaskTemplates from './subTaskTemplates'
import * as timeZones from './timeZones'
import * as urgencyRateTypes from './urgencyRateTypes'
import * as userStatuses from './userStatuses'

const catalogsFixtures = {
  ...faChangeTypes,
  ...subTaskTemplates,
  ...timeZones,
  ...userStatuses,
  ...locations,
  ...resolutionClassifications,
  ...urgencyRateTypes,
  ...infrastructureWorkTypes,
} as const

export default catalogsFixtures
