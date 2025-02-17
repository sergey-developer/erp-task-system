import * as warehouseDetail from './warehouseDetail'
import * as warehouses from './warehouses'

const warehousesFixtures = {
  ...warehouseDetail,
  ...warehouses,
} as const

export default warehousesFixtures
