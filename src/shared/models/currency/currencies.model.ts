import { IdType } from 'shared/types/common'

export type CurrencyListItemModel = {
  id: IdType
  title: string
}

export type CurrenciesModel = CurrencyListItemModel[]
