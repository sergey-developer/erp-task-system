import { generatePath } from 'react-router-dom'

import { UserApiEnum } from 'modules/user/constants'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const updateUserUrl = (userId: IdType): string =>
  appendSlashAtEnd(generatePath(UserApiEnum.UpdateUser, { id: String(userId) }))

export const updateUserStatusUrl = (userId: IdType): string =>
  appendSlashAtEnd(generatePath(UserApiEnum.UpdateUserStatus, { id: String(userId) }))

export const getWarehouseMSIUrl = (userId: IdType): string =>
  appendSlashAtEnd(generatePath(UserApiEnum.GetWarehouseMSI, { id: String(userId) }))
