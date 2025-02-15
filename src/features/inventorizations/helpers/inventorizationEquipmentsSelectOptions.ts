import { RelocationEquipmentDraftEditableTableProps } from 'features/relocationEquipments/components/RelocationEquipmentDraftEditableTable/types'

import { makeString } from 'shared/utils/string'

export const makeInventorizationEquipmentsSelectOptions = (
  data: RelocationEquipmentDraftEditableTableProps['equipments'],
) =>
  data.map(({ id, relocationEquipment, equipment }) => ({
    label: relocationEquipment
      ? relocationEquipment.title
      : makeString(', ', equipment.title, equipment.serialNumber, equipment.inventoryNumber),
    value: id,
    equipment,
    relocationEquipment,
  }))
