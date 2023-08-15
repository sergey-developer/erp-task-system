import * as countryList from './countryList'
import * as legalEntityList from './legalEntityList'
import * as measurementUnitList from './measurementUnitList'
import * as nomenclature from './nomenclature'
import * as nomenclatureGroupList from './nomenclatureGroupList'
import * as nomenclatureList from './nomenclatureList'
import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'

const warehouseFixtures = {
  ...warehouse,
  ...warehouseList,
  ...legalEntityList,
  ...nomenclature,
  ...nomenclatureList,
  ...nomenclatureGroupList,
  ...measurementUnitList,
  ...countryList,
} as const

export default warehouseFixtures
