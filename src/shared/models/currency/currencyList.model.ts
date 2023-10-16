import { CurrencyModel } from './currency.model'

export type CurrencyListItemModel = Pick<CurrencyModel, 'id' | 'title'>

export type CurrencyListModel = CurrencyListItemModel[]
