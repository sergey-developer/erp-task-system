import { IdType } from 'shared/types/common'

export type CustomerListItemModel = {
  id: IdType
  title: string
}

export type CustomerListModel = CustomerListItemModel[]
