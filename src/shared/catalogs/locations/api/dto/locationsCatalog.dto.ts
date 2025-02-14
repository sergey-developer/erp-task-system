import { IdType } from 'shared/types/common'

import { LocationTypeEnum } from '../constants'

export type LocationCatalogItemDTO = {
  id: IdType
  title: string
  type: LocationTypeEnum
  address?: string
}

export type LocationsCatalogDTO = LocationCatalogItemDTO[]
