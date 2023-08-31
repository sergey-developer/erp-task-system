import { CurrencyModel } from 'modules/warehouse/models'

export type CurrencyListItemModel = Pick<CurrencyModel, 'id' | 'title'>

export type CurrencyListModel = CurrencyListItemModel[]
