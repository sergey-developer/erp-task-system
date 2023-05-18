import { UserModel } from './user.model'

export type UpdateUserMutationArgs = {
  userId: number
} & UserModel

export type UpdateUserSuccessResponse = UserModel
