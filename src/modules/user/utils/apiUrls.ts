import { generatePath } from 'react-router-dom'

import { UserEndpointEnum } from 'modules/user/constants/api'

export const updateUserUrl = (userId: number): string =>
  generatePath(UserEndpointEnum.UpdateUser, { id: String(userId) })

export const updateUserStatusUrl = (userId: number): string =>
  generatePath(UserEndpointEnum.UpdateUserStatus, { id: String(userId) })
