import { UserStatusCodeEnum } from 'shared/catalogs/userStatuses/api/constants'
import { IdType } from 'shared/types/common'

export type UserStatusCatalogItemDTO = {
  id: IdType
  title: string
  color: string
  code: UserStatusCodeEnum
}

export type UserStatusesCatalogDTO = UserStatusCatalogItemDTO[]
