import * as checkInventorizationEquipmentsTable from './checkInventorizationEquipmentsTable'
import * as checkedInventorizationEquipmentsTemplate from './checkedInventorizationEquipmentsTemplate'
import * as inventorizationDetail from './inventorizationDetail'
import * as inventorizationEquipment from './inventorizationEquipmentDetail'
import * as inventorizationEquipments from './inventorizationEquipments'
import * as inventorizations from './inventorizations'

const inventorizationsFixtures = {
  ...inventorizationDetail,
  ...inventorizations,

  ...inventorizationEquipment,
  ...inventorizationEquipments,

  ...checkInventorizationEquipmentsTable,
  ...checkedInventorizationEquipmentsTemplate,
} as const

export default inventorizationsFixtures
