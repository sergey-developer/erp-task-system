import { IdType } from 'shared/types/common'

export type UpdateUserStatusMutationArgs = {
  userId: IdType
  status: number
}

export type UpdateUserStatusSuccessResponse = void
