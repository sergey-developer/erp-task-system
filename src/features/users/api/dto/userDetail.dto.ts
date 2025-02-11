import { UserPermissionsEnum } from 'features/users/api/constants'

import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { BaseUserType } from '../types'

export type UserPositionDTO = {
  id: IdType
  title: string
}

export type UserDetailDTO = BaseUserType & {
  fullName: string
  email: string
  timezone: string
  isStaff: boolean
  status: UserStatusCatalogItemDTO
  permissions: UserPermissionsEnum[]
  phone: string

  position: MaybeNull<UserPositionDTO>
}
