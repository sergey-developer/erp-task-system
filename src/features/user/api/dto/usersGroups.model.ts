import { IdType } from 'shared/types/common'

export type UsersGroupListItemModel = {
  id: IdType
  title: string
  users: IdType[]
}

export type UsersGroupsModel = UsersGroupListItemModel[]
