import * as legalEntityList from './legalEntityList'
import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'

const warehouseFixtures = {
  ...warehouse,
  ...warehouseList,
  ...legalEntityList,
} as const

export default warehouseFixtures
