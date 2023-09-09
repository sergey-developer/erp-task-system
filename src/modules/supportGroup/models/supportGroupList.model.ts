import { IdType } from 'shared/types/common'

export type SupportGroupListItemModel = {
  id: IdType
  name: string
}

export type SupportGroupListModel = Array<SupportGroupListItemModel>
