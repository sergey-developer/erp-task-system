import { BaseUserRequestArgs } from 'modules/user/types'

import { UserModel } from './user.model'

export type UpdateUserTimeZoneMutationArgs = BaseUserRequestArgs & Pick<UserModel, 'timezone'>
export type UpdateUserTimeZoneSuccessResponse = UserModel
