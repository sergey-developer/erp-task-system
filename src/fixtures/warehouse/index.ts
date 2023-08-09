import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'
import * as legalEntityList from './legalEntityList'
import * as nomenclatureGroupList from './nomenclatureGroupList'

const warehouseFixtures = {
  ...warehouse,
  ...warehouseList,
  ...legalEntityList,
  ...nomenclatureGroupList,
} as const

export default warehouseFixtures
