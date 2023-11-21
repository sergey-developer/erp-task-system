import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getEquipmentListPageLink = (
  equipmentNomenclatureId: IdType,
  equipmentNomenclatureTitle?: string,
): string => {
  const link = generatePath(WarehouseRouteEnum.EquipmentList, {
    id: String(equipmentNomenclatureId),
  })

  return equipmentNomenclatureTitle
    ? `${link}?equipmentNomenclatureTitle=${equipmentNomenclatureTitle}`
    : link
}
