import { UserPermissionsEnum } from 'features/user/constants'

import { UserStatusCatalogItemDTO } from 'shared/catalogs/api/dto/userStatuses'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type BaseUserModel = {
  id: IdType
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  avatar: MaybeNull<string>
}

export type UserPositionModel = {
  id: IdType
  title: string
}

export type UserModel = BaseUserModel & {
  fullName: string
  email: string
  timezone: string
  isStaff: boolean
  status: UserStatusCatalogItemDTO
  permissions: UserPermissionsEnum[]
  phone: string

  position: MaybeNull<UserPositionModel>
}
