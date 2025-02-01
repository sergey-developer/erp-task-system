import { IdType } from 'shared/types/common'

export type CurrencyCatalogItemDTO = {
  id: IdType
  title: string
}

export type CurrenciesCatalogDTO = CurrencyCatalogItemDTO[]
