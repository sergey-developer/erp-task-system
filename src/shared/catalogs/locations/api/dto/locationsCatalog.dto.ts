import { LocationTypeEnum } from 'shared/catalogs/constants'
import { IdType } from 'shared/types/common'

export type LocationCatalogItemDTO = {
  id: IdType
  title: string
  type: LocationTypeEnum
  address?: string
}

export type LocationsCatalogDTO = LocationCatalogItemDTO[]
