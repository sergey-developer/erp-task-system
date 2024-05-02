import * as customer from './customer'
import * as equipment from './equipment'
import * as inventorization from './inventorization'
import * as legalEntity from './legalEntity'
import * as measurementUnit from './measurementUnit'
import * as nomenclature from './nomenclature'
import * as nomenclatureGroup from './nomenclatureGroup'
import * as relocationEquipment from './relocationEquipment'
import * as relocationTask from './relocationTask'
import * as warehouse from './warehouse'
import * as workType from './workType'

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
