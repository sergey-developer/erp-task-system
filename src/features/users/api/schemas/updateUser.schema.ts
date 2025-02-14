import { IdType } from 'shared/types/common'

import { UserDetailDTO } from '../dto'

export type UpdateUserRequest = {
  userId: IdType
} & UserDetailDTO

export type UpdateUserResponse = UserDetailDTO
