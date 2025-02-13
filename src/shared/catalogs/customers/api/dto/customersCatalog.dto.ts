import { IdType } from 'shared/types/common'

export type CustomerCatalogItemDTO = {
  id: IdType
  title: string
}

export type CustomersCatalogDTO = CustomerCatalogItemDTO[]
