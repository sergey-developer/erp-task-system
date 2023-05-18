import { generatePath } from 'react-router-dom'

import { UserEndpointEnum } from '../constants/api'

export const updateUserUrl = (userId: number): string =>
  generatePath(UserEndpointEnum.UpdateUser, { id: String(userId) })
