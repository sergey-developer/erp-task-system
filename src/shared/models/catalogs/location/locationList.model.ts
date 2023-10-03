import { LocationTypeEnum } from 'shared/constants/catalogs'
import { IdType } from 'shared/types/common'

export type LocationListItemModel = {
  id: IdType
  title: string
  type: LocationTypeEnum
}

export type LocationListModel = LocationListItemModel[]
