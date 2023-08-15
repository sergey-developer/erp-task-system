import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'
import * as legalEntityList from './legalEntityList'
import * as nomenclatureList from './nomenclatureList'
import * as nomenclatureGroupList from './nomenclatureGroupList'

const warehouseFixtures = {
  ...warehouse,
  ...warehouseList,
  ...legalEntityList,
  ...nomenclatureList,
  ...nomenclatureGroupList,
} as const

export default warehouseFixtures
