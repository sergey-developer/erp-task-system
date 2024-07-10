import { EquipmentCatalogListModel } from 'modules/warehouse/models'

import { makeString } from 'shared/utils/string'

export const makeEquipmentsCatalogSelectOptions = (catalog: EquipmentCatalogListModel) =>
  catalog.map((eqp) => ({
    label: makeString(', ', eqp.title, eqp.serialNumber, eqp.inventoryNumber),
    value: eqp.id,
  }))
