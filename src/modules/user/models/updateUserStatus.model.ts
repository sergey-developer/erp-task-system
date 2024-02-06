import { BaseUserRequestArgs } from 'modules/user/types'

import { UserStatusModel } from 'shared/models/catalogs/userStatus'

export type UpdateUserStatusMutationArgs = BaseUserRequestArgs & {
  status: number
}

export type UpdateUserStatusSuccessResponse = UserStatusModel
