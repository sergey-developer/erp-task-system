import { EquipmentsCatalogModel } from 'modules/warehouse/models'

import { makeString } from 'shared/utils/string'

export const makeEquipmentsCatalogSelectOptions = (catalog: EquipmentsCatalogModel) =>
  catalog.map((eqp) => ({
    label: makeString(', ', eqp.title, eqp.serialNumber, eqp.inventoryNumber),
    value: eqp.id,
  }))
