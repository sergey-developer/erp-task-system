import { LocationTypeEnum } from 'shared/constants/catalogs'
import { IdType } from 'shared/types/common'

export type LocationCatalogListItemModel = {
  id: IdType
  title: string
  type: LocationTypeEnum
  address?: string
}

export type LocationsCatalogModel = LocationCatalogListItemModel[]
