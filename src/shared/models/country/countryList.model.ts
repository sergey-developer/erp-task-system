import { CountryModel } from './country.model'

export type CountryListItemModel = Pick<CountryModel, 'id' | 'title'>

export type CountryListModel = CountryListItemModel[]
