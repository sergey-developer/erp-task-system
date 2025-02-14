import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type GetEquipmentListPageLinkParams = {
  id: IdType
  title: string
  viewEquipmentId?: IdType
}

export const getEquipmentListPageLink = ({
  id,
  ...params
}: GetEquipmentListPageLinkParams): string =>
  getPathWithQs<Omit<GetEquipmentListPageLinkParams, 'id'>>(
    generatePath(WarehouseRouteEnum.Equipments, { id: String(id) }),
    params,
  )
