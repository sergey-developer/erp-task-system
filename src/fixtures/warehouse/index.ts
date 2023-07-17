import * as warehouse from './warehouse'
import * as warehouseList from './warehouseList'

const warehouseFixtures = {
  ...warehouse,
  ...warehouseList,
} as const

export default warehouseFixtures
