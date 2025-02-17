import * as inventorization from './inventorizations'
import * as nomenclatureGroup from './nomenclatureGroup'
import * as nomenclature from './nomenclatures'
import * as relocationEquipment from './relocationEquipments'
import * as relocationTask from './relocationTasks'
import * as warehouse from './warehouses'

const warehousesFixtures = {
  ...warehouse,
  ...inventorization,

  ...nomenclature,
  ...nomenclatureGroup,

  ...relocationTask,
  ...relocationEquipment,
} as const

export default warehousesFixtures
