import { generatePath } from 'react-router-dom'

import { UserEndpointEnum } from 'modules/user/constants/api'

import { appendSlashAtEnd } from 'shared/utils/string'

export const updateUserUrl = (userId: number): string =>
  appendSlashAtEnd(
    generatePath(UserEndpointEnum.UpdateUser, { id: String(userId) }),
  )

export const updateUserStatusUrl = (userId: number): string =>
  appendSlashAtEnd(
    generatePath(UserEndpointEnum.UpdateUserStatus, { id: String(userId) }),
  )
