import { CountryModel } from 'modules/country/models'

export type CountryListItemModel = Pick<CountryModel, 'id' | 'title'>

export type CountryListModel = CountryListItemModel[]
