import { CustomerModel } from 'modules/warehouse/models'

export type CustomerListItemModel = Pick<CustomerModel, 'id' | 'title'>

export type CustomerListModel = CustomerListItemModel[]
