import { UserRequestArgs } from 'features/user/types'

import { UserStatusModel } from 'shared/catalogs/models/userStatuses'

export type UpdateUserStatusMutationArgs = UserRequestArgs & {
  status: number
}

export type UpdateUserStatusSuccessResponse = UserStatusModel
