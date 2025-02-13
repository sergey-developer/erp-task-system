import { IdType } from 'shared/types/common'

export type WorkTypesCatalogItemDTO = {
  id: IdType
  title: string
}

export type WorkTypesCatalogDTO = WorkTypesCatalogItemDTO[]
