import { UserApiEnum } from 'features/user/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const updateUserUrl = (userId: IdType): string =>
  generateApiPath(UserApiEnum.UpdateUser, { id: String(userId) })

export const updateUserStatusUrl = (userId: IdType): string =>
  generateApiPath(UserApiEnum.UpdateUserStatus, { id: String(userId) })

export const getWarehouseMSIUrl = (userId: IdType): string =>
  generateApiPath(UserApiEnum.GetWarehouseMSI, { id: String(userId) })

export const getUserActionsUrl = (userId: IdType): string =>
  generateApiPath(UserApiEnum.GetUserActions, { id: String(userId) })
