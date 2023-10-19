import { UserStatusModel } from 'shared/models/catalogs/userStatus'
import { IdType } from 'shared/types/common'

export type UpdateUserStatusMutationArgs = {
  userId: IdType
  status: number
}

export type UpdateUserStatusSuccessResponse = UserStatusModel
