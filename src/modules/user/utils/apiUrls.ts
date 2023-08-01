import { generatePath } from 'react-router-dom'

import { UserApiEnum } from 'modules/user/constants/api'

import { appendSlashAtEnd } from 'shared/utils/string'

export const updateUserUrl = (userId: number): string =>
  appendSlashAtEnd(generatePath(UserApiEnum.UpdateUser, { id: String(userId) }))

export const updateUserStatusUrl = (userId: number): string =>
  appendSlashAtEnd(
    generatePath(UserApiEnum.UpdateUserStatus, { id: String(userId) }),
  )
