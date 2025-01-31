import { IdType } from 'shared/types/common'

export type WorkGroupsCatalogItemDTO = {
  id: IdType
  name: string
}

export type WorkGroupsCatalogDTO = WorkGroupsCatalogItemDTO[]
