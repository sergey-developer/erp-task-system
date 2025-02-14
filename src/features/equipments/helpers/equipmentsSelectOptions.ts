import { makeString } from 'shared/utils/string'

import { EquipmentsCatalogDTO } from '../api/dto'

export const makeEquipmentsSelectOptions = (data: EquipmentsCatalogDTO) =>
  data.map((eqp) => ({
    label: makeString(', ', eqp.title, eqp.serialNumber, eqp.inventoryNumber),
    value: eqp.id,
  }))
