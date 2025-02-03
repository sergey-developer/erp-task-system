import { IdType } from 'shared/types/common'

export type CountryCatalogItemDTO = {
  id: IdType
  title: string
}

export type CountriesCatalogDTO = CountryCatalogItemDTO[]
