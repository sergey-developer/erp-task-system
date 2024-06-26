import { UserRequestArgs } from 'modules/user/types'

import { UserModel } from './user.model'

export type UpdateUserTimeZoneMutationArgs = UserRequestArgs & Pick<UserModel, 'timezone'>
export type UpdateUserTimeZoneSuccessResponse = UserModel
