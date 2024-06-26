import { UserRequestArgs } from 'modules/user/types'

import { UserStatusModel } from 'shared/models/catalogs/userStatus'

export type UpdateUserStatusMutationArgs = UserRequestArgs & {
  status: number
}

export type UpdateUserStatusSuccessResponse = UserStatusModel
