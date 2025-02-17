import * as countries from './countries'
import * as currencies from './currencies'
import * as customers from './customers'
import * as faChangeTypes from './faChangeTypes'
import * as infrastructureWorkTypes from './infrastructureWorkTypes'
import * as legalEntities from './legalEntities'
import * as locations from './locations'
import * as macroregions from './macroregions'
import * as measurementUnits from './measurementUnits'
import * as resolutionClassifications from './resolutionClassifications'
import * as subTaskTemplates from './subTaskTemplates'
import * as timeZones from './timeZones'
import * as urgencyRateTypes from './urgencyRateTypes'
import * as userStatuses from './userStatuses'
import * as workTypes from './workTypes'

const catalogsFixtures = {
  ...faChangeTypes,
  ...subTaskTemplates,
  ...timeZones,
  ...userStatuses,
  ...locations,
  ...resolutionClassifications,
  ...urgencyRateTypes,
  ...infrastructureWorkTypes,
  ...customers,
  ...legalEntities,
  ...measurementUnits,
  ...macroregions,
  ...workTypes,
  ...countries,
  ...currencies,
} as const

export default catalogsFixtures
