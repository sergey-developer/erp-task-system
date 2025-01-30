import { EquipmentsCatalogModel } from 'features/warehouse/models'

import { makeString } from 'shared/utils/string'

export const makeEquipmentsSelectOptions = (data: EquipmentsCatalogModel) =>
  data.map((eqp) => ({
    label: makeString(', ', eqp.title, eqp.serialNumber, eqp.inventoryNumber),
    value: eqp.id,
  }))
