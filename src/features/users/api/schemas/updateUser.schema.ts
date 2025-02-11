import { IdType } from 'shared/types/common'

import { UserDetailDTO } from '../dto'

export type UpdateUserMutationArgs = {
  userId: IdType
} & UserDetailDTO

export type UpdateUserSuccessResponse = UserDetailDTO
