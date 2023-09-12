import { generatePath } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { IdType } from 'shared/types/common'

export const getEquipmentListPageLink = (id: IdType): string =>
  generatePath(RouteEnum.EquipmentList, { id: String(id) })
