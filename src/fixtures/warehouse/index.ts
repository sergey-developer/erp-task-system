import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'
import * as legalEntityList from './legalEntityList'
import * as nomenclatureList from './nomenclatureList'
import * as nomenclatureGroupList from './nomenclatureGroupList'
import * as measurementUnitList from './measurementUnitList'
import * as countryList from './countryList'

const warehouseFixtures = {
  ...warehouse,
  ...warehouseList,
  ...legalEntityList,
  ...nomenclatureList,
  ...nomenclatureGroupList,
  ...measurementUnitList,
  ...countryList,
} as const

export default warehouseFixtures
