import { IdType } from 'shared/types/common'

export type CountryListItemModel = {
  id: IdType
  title: string
}

export type CountriesCatalogModel = CountryListItemModel[]
