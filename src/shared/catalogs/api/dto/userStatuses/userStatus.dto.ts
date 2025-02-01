import { UserStatusCodeEnum } from 'shared/catalogs/constants'
import { IdType } from 'shared/types/common'

export type UserStatusDTO = {
  id: IdType
  title: string
  color: string
  code: UserStatusCodeEnum
}
