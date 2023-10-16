import { UserStatusCodeEnum } from 'shared/constants/catalogs'
import { IdType } from 'shared/types/common'

export type UserStatusModel = {
  id: IdType
  title: string
  color: string
  code: UserStatusCodeEnum
}
