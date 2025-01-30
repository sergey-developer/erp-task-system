import { IdType } from 'shared/types/common'

import { UserModel } from './user.model'

export type UpdateUserMutationArgs = {
  userId: IdType
} & UserModel

export type UpdateUserSuccessResponse = UserModel
