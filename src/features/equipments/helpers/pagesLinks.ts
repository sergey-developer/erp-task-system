import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { generatePath } from 'react-router-dom'

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
    generatePath(WarehousesRoutesEnum.Equipments, { id: String(id) }),
    params,
  )
