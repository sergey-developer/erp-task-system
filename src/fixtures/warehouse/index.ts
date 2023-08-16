import * as legalEntityList from './legalEntityList'
import * as warehouseList from './warehouseList'

const warehouseFixtures = {
  ...warehouseList,
  ...legalEntityList,
} as const

export default warehouseFixtures
