import { IdType } from 'shared/types/common'

import { UserModel } from './user.model'

export type UpdateUserTimeZoneMutationArgs = {
  userId: IdType
} & Pick<UserModel, 'timezone'>

export type UpdateUserTimeZoneSuccessResponse = UserModel
