import * as relocationEquipmentAttachments from './relocationEquipmentAttachments'
import * as relocationEquipments from './relocationEquipments'

const relocationEquipmentsFixtures = {
  ...relocationEquipments,
  ...relocationEquipmentAttachments,
} as const

export default relocationEquipmentsFixtures
