import { InventorizationEquipmentsModel } from 'modules/warehouse/models'

import { makeString } from 'shared/utils/string'

export const makeInventorizationEquipmentsSelectOptions = (data: InventorizationEquipmentsModel) =>
  data.map(({ id, equipment }) => ({
    label: makeString(', ', equipment.title, equipment.serialNumber, equipment.inventoryNumber),
    value: id,
  }))
