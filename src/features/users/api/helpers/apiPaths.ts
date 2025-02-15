import { UsersApiPathsEnum } from 'features/users/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeUpdateUserApiPath = (userId: IdType): string =>
  generateApiPath(UsersApiPathsEnum.UpdateUser, { id: String(userId) })

export const makeUpdateUserStatusApiPath = (userId: IdType): string =>
  generateApiPath(UsersApiPathsEnum.UpdateUserStatus, { id: String(userId) })

export const makeGetWarehouseMSIApiPath = (userId: IdType): string =>
  generateApiPath(UsersApiPathsEnum.GetWarehouseMSI, { id: String(userId) })

export const makeGetUserActionsApiPath = (userId: IdType): string =>
  generateApiPath(UsersApiPathsEnum.GetUserActions, { id: String(userId) })
