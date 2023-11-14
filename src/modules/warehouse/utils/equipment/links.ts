import qs from 'qs'
import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

type GetEquipmentListPageLinkParams = {
  id: IdType
  title: string
  viewEquipmentId?: IdType
}

export const getEquipmentListPageLink = ({
  id,
  title,
  viewEquipmentId,
}: GetEquipmentListPageLinkParams): string =>
  `${generatePath(WarehouseRouteEnum.EquipmentList, {
    id: String(id),
  })}?${qs.stringify({ equipmentNomenclatureTitle: title, viewEquipmentId })}`
