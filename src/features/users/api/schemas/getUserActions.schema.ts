import { RequestWithUser } from 'features/users/api/types'

import { UserActionsDTO } from '../dto'

export type GetUserActionsRequest = RequestWithUser
export type GetUserActionsResponse = UserActionsDTO
