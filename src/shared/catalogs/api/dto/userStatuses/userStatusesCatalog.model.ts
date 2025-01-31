import { UserStatusCodeEnum } from 'shared/catalogs/constants'
import { IdType } from 'shared/types/common'

export type UserStatusListItemModel = {
  id: IdType
  title: string
  color: string
  code: UserStatusCodeEnum
}

export type UserStatusesCatalogModel = UserStatusListItemModel[]
