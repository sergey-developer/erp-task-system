import * as customer from './customers'
import * as equipment from './equipments'
import * as inventorization from './inventorizations'
import * as legalEntity from './legalEntities'
import * as measurementUnit from './measurementUnits'
import * as nomenclatureGroup from './nomenclatureGroup'
import * as nomenclature from './nomenclatures'
import * as relocationEquipment from './relocationEquipments'
import * as relocationTask from './relocationTasks'
import * as warehouse from './warehouses'
import * as workType from './workTypes'

const warehouseFixtures = {
  ...customer,
  ...equipment,
  ...warehouse,
  ...workType,
  ...inventorization,
  ...legalEntity,
  ...measurementUnit,

  ...nomenclature,
  ...nomenclatureGroup,

  ...relocationTask,
  ...relocationEquipment,
} as const

export default warehouseFixtures
